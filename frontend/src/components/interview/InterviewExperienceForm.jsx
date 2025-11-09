import { useState, useRef, useCallback, useEffect } from "react";
import { Briefcase, Send, Eye, EyeOff, Trophy, XCircle, Clock, Bold, Italic, List, ListOrdered, Heading1, Heading2, Heading3, Link as LinkIcon, Code, Quote, Minus } from "lucide-react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $convertToMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { HeadingNode, QuoteNode, $createQuoteNode } from "@lexical/rich-text";
import { CodeNode, $createCodeNode } from "@lexical/code";
import { LinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { 
  FORMAT_TEXT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  COMMAND_PRIORITY_LOW,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode } from "@lexical/rich-text";
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { ListItemNode, ListNode } from "@lexical/list";
import { INSERT_UNORDERED_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND } from "@lexical/list";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { VERDICT_OPTIONS } from "@/constants/interviewConstants";

// Toolbar Component
function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [blockType, setBlockType] = useState("paragraph");

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          setIsBold(selection.hasFormat("bold"));
          setIsItalic(selection.hasFormat("italic"));
          setIsCode(selection.hasFormat("code"));
          
          // Get block type
          const anchorNode = selection.anchor.getNode();
          const element = anchorNode.getKey() === "root" 
            ? anchorNode 
            : anchorNode.getTopLevelElementOrThrow();
          const elementDOM = editor.getElementByKey(element.getKey());
          
          if (elementDOM !== null) {
            if (element.getType() === "heading") {
              const tag = element.getTag();
              setBlockType(tag);
            } else if (element.getType() === "quote") {
              setBlockType("quote");
            } else if (element.getType() === "code") {
              setBlockType("code");
            } else {
              setBlockType("paragraph");
            }
          }
        }
      });
    });
  }, [editor]);

  const formatBold = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
  }, [editor]);

  const formatItalic = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
  }, [editor]);

  const formatCode = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
  }, [editor]);

  const formatHeading = useCallback((headingSize) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    });
  }, [editor]);

  const formatQuote = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  }, [editor]);

  const formatBulletList = useCallback(() => {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  }, [editor]);

  const formatNumberedList = useCallback(() => {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
  }, [editor]);

  const insertLink = useCallback(() => {
    const url = prompt("Enter URL:");
    if (url) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
    }
  }, [editor]);

  const insertHorizontalRule = useCallback(() => {
    editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined);
  }, [editor]);

  const buttonClass = (isActive) => 
    `p-2 border-2 border-black dark:border-[#F5E6D3] transition-all duration-150 ${
      isActive 
        ? "bg-[#C1502E] text-[#F5E6D3] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(245,230,211,1)] -translate-x-0.5 -translate-y-0.5" 
        : "bg-white dark:bg-[#2C1810] text-[#2C1810] dark:text-[#F5E6D3] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(245,230,211,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(245,230,211,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:active:shadow-[1px_1px_0px_0px_rgba(245,230,211,1)] active:translate-x-0 active:translate-y-0"
    }`;

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b-4 border-black dark:border-[#F5E6D3] bg-[#F5E6D3] dark:bg-[#2C1810]">
      {/* Text Formatting */}
      <button
        onClick={formatBold}
        type="button"
        className={buttonClass(isBold)}
        aria-label="Format Bold"
      >
        <Bold className="h-4 w-4" />
      </button>
      <button
        onClick={formatItalic}
        type="button"
        className={buttonClass(isItalic)}
        aria-label="Format Italic"
      >
        <Italic className="h-4 w-4" />
      </button>
      <button
        onClick={formatCode}
        type="button"
        className={buttonClass(isCode)}
        aria-label="Inline Code"
      >
        <Code className="h-4 w-4" />
      </button>

      <div className="w-px bg-black dark:bg-[#F5E6D3]"></div>

      {/* Headings */}
      <button
        onClick={() => formatHeading("h1")}
        type="button"
        className={buttonClass(blockType === "h1")}
        aria-label="Heading 1"
      >
        <Heading1 className="h-4 w-4" />
      </button>
      <button
        onClick={() => formatHeading("h2")}
        type="button"
        className={buttonClass(blockType === "h2")}
        aria-label="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </button>
      <button
        onClick={() => formatHeading("h3")}
        type="button"
        className={buttonClass(blockType === "h3")}
        aria-label="Heading 3"
      >
        <Heading3 className="h-4 w-4" />
      </button>

      <div className="w-px bg-black dark:bg-[#F5E6D3]"></div>

      {/* Lists */}
      <button
        onClick={formatBulletList}
        type="button"
        className={buttonClass(false)}
        aria-label="Bullet List"
      >
        <List className="h-4 w-4" />
      </button>
      <button
        onClick={formatNumberedList}
        type="button"
        className={buttonClass(false)}
        aria-label="Numbered List"
      >
        <ListOrdered className="h-4 w-4" />
      </button>

      <div className="w-px bg-black dark:bg-[#F5E6D3]"></div>

      {/* Quote */}
      <button
        onClick={formatQuote}
        type="button"
        className={buttonClass(blockType === "quote")}
        aria-label="Quote"
      >
        <Quote className="h-4 w-4" />
      </button>
    </div>
  );
}

// Lexical editor theme
const theme = {
  paragraph: "mb-2",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    code: "bg-[#2C1810] text-[#F5E6D3] px-1 py-0.5 font-mono text-sm rounded",
  },
  list: {
    ul: "list-disc list-inside ml-4 mb-2",
    ol: "list-decimal list-inside ml-4 mb-2",
    listitem: "mb-1",
  },
  heading: {
    h1: "text-2xl font-bold mb-2",
    h2: "text-xl font-bold mb-2",
    h3: "text-lg font-bold mb-2",
  },
  link: "text-[#C1502E] underline hover:text-[#C1502E]/80 cursor-pointer",
  code: "bg-[#2C1810] text-[#F5E6D3] p-2 font-mono text-sm block my-2 rounded",
  quote: "border-l-4 border-[#C1502E] pl-4 italic my-2",
};

// All required nodes for MarkdownShortcutPlugin
const EDITOR_NODES = [
  HorizontalRuleNode,
  CodeNode,
  HeadingNode,
  LinkNode,
  ListNode,
  ListItemNode,
  QuoteNode,
];

// Initial Lexical config
const initialConfig = {
  namespace: "InterviewEditor",
  theme,
  nodes: EDITOR_NODES,
  onError: (error) => console.error(error),
};

export default function InterviewExperienceForm({ onSuccess, onSubmit, isPending }) {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    verdict: "Pending",
    isAnonymous: false
  });
  const [editorContent, setEditorContent] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const editorStateRef = useRef(null);

  const handleEditorChange = (editorState, editor) => {
    editorStateRef.current = editorState;
    
    // Get Markdown content
    editorState.read(() => {
      const markdown = $convertToMarkdownString(TRANSFORMERS);
      setEditorContent(markdown);
      
      // Get text length for validation
      const textContent = editorState.read(() => {
        const root = editorState._nodeMap.get("root");
        return root ? root.getTextContent() : "";
      });
      setCharacterCount(textContent.length);
    });
  };

  const handleSubmit = () => {
    // Validate
    if (!formData.company || !formData.role || characterCount < 10) {
      alert("Please fill all required fields. Content must be at least 10 characters.");
      return;
    }

    const submitData = {
      ...formData,
      content: editorContent
    };

    onSubmit(submitData);
    
    // Reset
    setFormData({
      company: "",
      role: "",
      verdict: "Pending",
      isAnonymous: false
    });
    setEditorContent("");
    setCharacterCount(0);
    
    if (onSuccess) onSuccess();
  };

  const getVerdictIcon = (verdict) => {
    switch(verdict) {
      case "Selected": return Trophy;
      case "Rejected": return XCircle;
      case "Pending": return Clock;
      default: return Clock;
    }
  };

  return (
    <div className="bg-[#F5E6D3] dark:bg-[#2C1810] border-4 border-black dark:border-[#F5E6D3] shadow-[12px_12px_0px_0px_rgba(193,80,46,1)] p-8 rotate-1 hover:rotate-0 hover:shadow-[16px_16px_0px_0px_rgba(193,80,46,1)] transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#C1502E] p-3 border-4 border-black dark:border-[#F5E6D3] -rotate-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(245,230,211,1)]">
          <Briefcase className="h-6 w-6 text-[#F5E6D3]" />
        </div>
        <h3 className="text-3xl font-black text-[#2C1810] dark:text-[#F5E6D3]">
          SHARE YOUR EXPERIENCE
        </h3>
      </div>

      <div className="space-y-6">
        {/* Company & Role */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-black text-[#2C1810] dark:text-[#F5E6D3] mb-2">
              COMPANY *
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              className="w-full px-4 py-3 bg-white dark:bg-[#2C1810] text-[#2C1810] dark:text-[#F5E6D3] border-4 border-black dark:border-[#F5E6D3] font-bold focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(193,80,46,1)] focus:-translate-x-1 focus:-translate-y-1 transition-all"
              placeholder="e.g., Google"
            />
          </div>
          
          <div>
            <label className="block text-sm font-black text-[#2C1810] dark:text-[#F5E6D3] mb-2">
              ROLE *
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              className="w-full px-4 py-3 bg-white dark:bg-[#2C1810] text-[#2C1810] dark:text-[#F5E6D3] border-4 border-black dark:border-[#F5E6D3] font-bold focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(193,80,46,1)] focus:-translate-x-1 focus:-translate-y-1 transition-all"
              placeholder="e.g., Software Engineer"
            />
          </div>
        </div>

        {/* Verdict */}
        <div>
          <label className="block text-sm font-black text-[#2C1810] dark:text-[#F5E6D3] mb-2">
            VERDICT *
          </label>
          <div className="flex flex-wrap gap-4">
            {VERDICT_OPTIONS.map((verdict) => {
              const Icon = getVerdictIcon(verdict);
              return (
                <button
                  key={verdict}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, verdict }))}
                  className={`px-6 py-3 font-black border-4 border-black dark:border-[#F5E6D3] transition-all duration-150 ${
                    formData.verdict === verdict
                      ? "bg-[#C1502E] text-[#F5E6D3] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(245,230,211,1)] -translate-x-1 -translate-y-1"
                      : "bg-white dark:bg-[#2C1810] text-[#2C1810] dark:text-[#F5E6D3] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(245,230,211,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(245,230,211,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:active:shadow-[2px_2px_0px_0px_rgba(245,230,211,1)] active:translate-x-0 active:translate-y-0"
                  }`}
                >
                  <Icon className="inline h-5 w-5 mr-2" />
                  {verdict.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Editor */}
        <div>
          <label className="block text-sm font-black text-[#2C1810] dark:text-[#F5E6D3] mb-2">
            YOUR EXPERIENCE * (min 10 characters)
          </label>
          <div className="border-4 border-black dark:border-[#F5E6D3] bg-white dark:bg-[#2C1810] focus-within:shadow-[6px_6px_0px_0px_rgba(193,80,46,1)] transition-all">
            <LexicalComposer initialConfig={initialConfig}>
              <ToolbarPlugin />
              <div className="relative">
                <RichTextPlugin
                  contentEditable={
                    <ContentEditable 
                      className="min-h-[200px] p-4 outline-none text-[#2C1810] dark:text-[#F5E6D3] font-medium"
                    />
                  }
                  placeholder={
                    <div className="absolute top-4 left-4 text-[#2C1810]/50 dark:text-[#F5E6D3]/50 pointer-events-none font-medium">
                      Share your interview experience...
                    </div>
                  }
                  ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <ListPlugin />
                <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
                <OnChangePlugin onChange={handleEditorChange} />
              </div>
            </LexicalComposer>
          </div>
          <p className="text-xs font-bold text-[#2C1810] dark:text-[#F5E6D3] mt-2">
            {characterCount} characters
          </p>
        </div>

        {/* Anonymous Toggle */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, isAnonymous: !prev.isAnonymous }))}
            className={`flex items-center gap-3 px-6 py-3 font-black border-4 border-black dark:border-[#F5E6D3] transition-all duration-150 ${
              formData.isAnonymous
                ? "bg-[#C1502E] text-[#F5E6D3] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(245,230,211,1)] -translate-x-0.5 -translate-y-0.5"
                : "bg-white dark:bg-[#2C1810] text-[#2C1810] dark:text-[#F5E6D3] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(245,230,211,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(245,230,211,1)] hover:-translate-x-0.5 hover:-translate-y-0.5"
            }`}
          >
            {formData.isAnonymous ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            POST ANONYMOUSLY
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full group px-8 py-5 bg-[#C1502E] text-[#F5E6D3] text-xl font-black border-4 border-black dark:border-[#F5E6D3] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(245,230,211,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(245,230,211,1)] hover:-translate-x-1 hover:-translate-y-1 active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:active:shadow-[4px_4px_0px_0px_rgba(245,230,211,1)] active:translate-x-1 active:translate-y-1 transition-all duration-150 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          {isPending ? "POSTING..." : "POST EXPERIENCE"}
        </button>
      </div>
    </div>
  );
}

import { useLocation } from 'react-router-dom'; 

export const useChatbotVisibility = () => {
  const location = useLocation(); 
  const currentPath = location.pathname;

  // Defined the pages where the chatbot should be visible
  const visiblePaths = [
    '/dsa',
    '/interview',
    '/dsa/topics', 
    '/interview/preparation', 
    
  ];

  // Check if the current path starts with any of the visible paths
  const isVisible = visiblePaths.some(path => currentPath.startsWith(path));

  return isVisible;
};
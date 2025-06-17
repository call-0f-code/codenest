const Interview = require('../models/interviewExp');


exports.createInterviewExp = async (req, res) => {
  try {
    const { company , role , verdict , content } = req.body;

    const newInterview = new Interview({
        company , role , verdict , content
    });
    const savedInterview = await newInterview.save();

    return res.status(200).json({
      success: true,
      message: "Interview Experience Created Succesfully",
      data: savedInterview,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to create New Experience",
    });
  }
};

exports.getAllInterviewExp = async (req, res) => {
  try {
    const interveiwExp = await Interview.find({});
    res.status(200).json({
      success: true,
      data: interveiwExp,
      message: "ALl Experience Fetched Succesfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Unable to get all the Exp",
    });
  }
};

exports.deleteInterviewExp = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteInterviewExp = await Interview.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      data: deleteInterviewExp,
      message: "Exp was deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      succces: false,
      error: err.message,
      message: "Unable to delete the Exp",
    });
  }
};

//.pending : Update inteveiw exp . controller reaminig 

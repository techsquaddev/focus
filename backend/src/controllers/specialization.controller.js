import Specialization from "../models/specialization.model.js";

// create a new specialization
export const createSpecialization = async (req, res) => {
  try {
    const { name, code } = req.body;

    const newSpecialization = new Specialization({
      name,
      code,
    });

    // Parallel Saving
    await Promise.all([newSpecialization.save()]);

    res.status(201).json(newSpecialization);
  } catch (error) {
    console.log("Error in create specialization", error.message);
    res.status(500).json({
      success: false,
      message: "Error in create specialization",
      error,
    });
  }
};

// get all specializations
export const getAllSpecializations = async (req, res) => {
  try {
    const specializations = await Specialization.find();
    res.status(200).json(specializations);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in get all specializations",
      error,
    });
  }
};

// Update specialization by ID
export const updateSpecialization = async (req, res) => {
  try {
    const specializationId = req.params.specializationId;
    const specExist = await Specialization.findById(specializationId);
    if (!specExist) {
      return res.status(404).json({ message: "Specialization not found" });
    }
    const updatedSpecialization = await Specialization.findByIdAndUpdate(
      specializationId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedSpecialization);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in update the specialization",
      error,
    });
  }
};

// Delete specialization with reference data
export const deleteSpecialization = async (req, res) => {
  try {
    const specializationId = req.params.specializationId;

    const deletedSpecialization = await Specialization.findByIdAndDelete(
      specializationId
    );

    if (!deletedSpecialization) {
      return res.status(404).send({ message: "Specialization not found" });
    }

    res.status(200).send({
      success: true,
      message: "Specialization deleted successfully.",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error deleting specialization",
      error: error.message,
    });
  }
};

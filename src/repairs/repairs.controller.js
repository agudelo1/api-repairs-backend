import { RepairService } from "./repairs.service.js";

const repairService = new RepairService();

export const findAllRepairs = async (req, res) => {
  try {
    const repairs = await repairService.findAllRepairs();
    return res.json(repairs);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createRepair = async (req, res) => {
  try {
    const repair = await repairService.createRepair(req.body);
    return res.status(201).json(repair);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const findOneRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await repairService.findOneRepair(id);

    if (!repair) {
      return res.status(404).json({
        status: "error",
        message: `Repair with id: ${id} not found`,
      });
    }

    return res.json(repair);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateRepair = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await repairService.findOneRepair(id);

    if (!repair) {
      return res.status(404).json({
        status: "error",
        message: `Repair with id: ${id} not found`,
      });
    }

    const { status } = req.body;

    const updatedRepair = await repairService.updateRepair(repair, status);

    res.json(updatedRepair);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteRepair = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await repairService.findOneRepair(id);
    const statusExists = await repairService.findRepairByStatus();

    if (statusExists) {
      return res.status(400).json({
        error: "You cannot delete the repair because its status is completed.",
      });
    }

    if (!repair) {
      return res.status(404).json({
        status: "error",
        message: `Repair with id: ${id} not found`,
      });
    }

    await repairService.deleteRepair(repair);

    res.status(204).json(null);
  } catch (error) {
    return res.status(500).json(error);
  }
};

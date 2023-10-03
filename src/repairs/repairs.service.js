import Repair from "./repairs.model.js";

export class RepairService {
  async findOneRepair(id) {
    return await Repair.findOne({
      where: {
        id,
        status: "pending",
      },
    });
  }

  async findAllRepairs() {
    return await Repair.findAll({
      where: {
        status: "pending",
      },
    });
  }

  async createRepair(data) {
    return await Repair.create(data);
  }

  async updateRepair(repair, data) {
    return await repair.update({
      status: data,
    });
  }

  async deleteRepair(repair) {
    return await repair.update({
      status: "cancelled",
    });
  }

  async findRepairByStatus() {
    const status = await Repair.findOne({ where: { status: "completed" } });
    return !!status;
  }
}

import ServicesService from "../services/services.service";

const service = new ServicesService ()
export default class ServicesController {



  async getAll(req, res) {


    return res
  }

  async getById(req, res) {}

  async create(req, res) {}

  async update(req, res) {}

  async remove(req, res) {
   const { id } =req.params ;

service.remove(id);


  }
}

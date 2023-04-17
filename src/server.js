import { createServer, Model } from "miragejs";
const patients = {
  name_patient: "João",
  name_mother: "Maria",
  birthday: "01/01/2023",
  cpf: "14414714723",
  cns: "121121",
  cep: "12436565",
  street: "Rua",
  complement: "",
  neighborhood: "Bairro",
  city: "Cidade",
  state: "ES",
};

export function makeServer({
  environment = "development",
  url = undefined,
} = {}) {
  let server = createServer({
    environment,

    models: {
      patient: Model,
    },

    seeds(server) {
      server.create("patient", patients);
    },

    routes() {
      this.namespace = "api";
      this.urlPrefix = "http://127.0.0.1:5173/";
      this.passthrough("https://viacep.com.br", "http://127.0.0.1:5173/");
      this.get("/patients", (schema) => {
        return schema.patients.all();
      });

      this.post("/patients", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.patients.create(attrs);
      });

      this.patch("/patients/:id", (schema, request) => {
        let id = request.params.id;
        let attrs = JSON.parse(request.requestBody);
        return schema.patients.find(id).update(attrs);
      });

      this.delete("/patients/:id", (schema, request) => {
        let id = request.params.id;
        return schema.patients.find(id).destroy();
      });
    },
  });

  return server;
}

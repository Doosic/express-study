import * as express from "express";
import catsRouter from "./cats/cats.route";

const app: express.Express = express();

// * logging middleware
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("this is middleware");
  next();
});

//* json middleware
app.use(express.json());

app.use(catsRouter);

// * 404 middlewart
app.use((req, res, next) => {
  console.log("this is error middlewart");
  res.send({ error: "404 not found error" });
});

const port: number = 8000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/`);
});

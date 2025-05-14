import { ruruHTML } from "ruru/server";
const ruru = (_req, res) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: "/graphql" }))
}

export default ruru;
export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            res.status(201).json("teste");
        } catch (error) {
            res.status(500).json({ error: "Failed to create debt" });
        }
    } else if (req.method === "GET") {
        res.status(200).json("teste");
    }
}

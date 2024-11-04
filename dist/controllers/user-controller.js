import prisma from "../utils/db-config.js";
export const newUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExist = await prisma.user.findUnique({
            where: { email },
        });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }
        await prisma.user.create({
            data: { name, email, password },
        });
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        console.log("New user", error);
    }
};
export const allUsers = async (req, res) => {
    const users = await prisma.user.findMany({});
    res.status(200).json({ success: true, users });
};
export const singleUser = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "User ID is required" });
    }
    const user = await prisma.user.findFirst({
        where: { id },
    });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ success: true, user });
};
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    if (!id) {
        return res.status(400).json({ message: "User ID is required" });
    }
    const user = await prisma.user.findFirst({
        where: { id },
    });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    await prisma.user.update({
        where: { id },
        data: { name, email, password },
    });
    res.status(200).json({ success: true, message: "User updated successfully" });
};
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "User ID is required" });
    }
    const user = await prisma.user.findFirst({
        where: { id },
    });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    await prisma.user.delete({
        where: { id },
    });
    res.status(200).json({ success: true, message: "User deleted successfully" });
};

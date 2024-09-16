const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany({include: {products: true}});
      res.send(users);
    } catch (error) {
      res.send(error);
    }
  },

  signup: async (req, res) => {
    const { fullName, email, password, company } = req.body;
    try {
      const hashed = await bcrypt.hash(password, 10);
      
      const values = {
        fullName: fullName,
        company: company,
        email: email,
        password: hashed,
      };
      console.log(values);
      const user = await prisma.user.create({ data: values });
      res.send("user created");
    } catch (error) {
      res.send(error);
    }
  },
};

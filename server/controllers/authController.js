const prisma = require("../prisma/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register club
exports.registerClub = async (req, res) => {
  const { name, email, password, description } = req.body;

    // check if email already exists in user or club table
    const user = await prisma.user.findUnique({ where: { email } });
    const club = await prisma.club.findUnique({ where: { email } });
  
    if (user || club) {
      return res.status(400).json({ message: "Email already exists" });
    }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const club = await prisma.club.create({
      data: {
        email,
        name,
        description,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "Club registered successfully", club });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to register club", error: err.message });
  }
};

// login club
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const club = await prisma.club.findUnique({ where: { email } });
    let user;

    if(!club) {
      user = await prisma.user.findUnique({ where: { email } });
    }

    const entity = club || user;

    if (!entity) {
      return res.status(404).json({ message: 'Club not found' })
    }

    const passwordMatch = await bcrypt.compare(password, entity.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // send token that expire in 30 days
    const token = jwt.sign({ id: entity.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({ message: "logged in successfully", token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to login", error: err.message });
  }
};

exports.register = async (req, res) => {
  const { email, name, password } = req.body;

  // check if email already exists in user or club table
  const user = await prisma.user.findUnique({ where: { email } });
  const club = await prisma.club.findUnique({ where: { email } });

  if (user || club) {
    return res.status(400).json({ message: "Email already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to register user", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "User logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Failed to login" });
  }
};
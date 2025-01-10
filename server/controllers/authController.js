const prisma = require("../prisma/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register club
exports.registerClub = async (req, res) => {
  const clubData = req.body;
  const email = clubData.email;
  const password = clubData.password;

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
        ...clubData,
        memberCount: parseInt(clubData.memberCount),
        founded: parseInt(clubData.founded),
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "Club registered successfully", club });
  } catch (err) {
    // console.log(err)
    res
      .status(500)
      .json({ message: "Failed to register club", error: err.message });
  }
};

// login club
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const club = await prisma.club.findUnique({ 
      where: { email },
      include: {
        followers: true
      }
     });
    let user;

    if(!club) {
      user = await prisma.user.findUnique(
        { where: { email },
        include: {
          following: true
        }
      });
    }

    const entity = club || user;

    if (!entity) {
      return res.status(404).json({ message: 'User not found' })
    }

    const passwordMatch = await bcrypt.compare(password, entity.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // send token that expire in 30 days
    const token = jwt.sign({ id: entity.id, name: entity.name }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    console.log(!!club)
    res.status(200).json({ message: "logged in successfully", token, isClub: !!club, entity });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to login", error: err.message });
  }
};

// register user
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

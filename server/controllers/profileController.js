const { uploadFileToS3 } = require("../services/s3Service");
const { updateProfile } = require("../services/profileService");

const saveProfile = async (req, res) => {
  const { id, name, email, university, city, description, category, founded, memberCount } = req.body;
  const type = req.query.type;
  const file = req.file;

  if (!id) return res.status(400).json({ error: "Profile ID is required." });

  try {
    let avatarUrl = null;

    // Upload avatar if provided
    if (file) {
      avatarUrl = await uploadFileToS3(file.buffer, file.mimetype, id);
    }

    const data = type === "club" ? {name, email, university, city, description, category, founded: parseInt(founded), memberCount: parseInt(memberCount)} : {name, email, university, city};
    const updatedProfile = await updateProfile(type, id, data, avatarUrl);

    res.status(200).json({
      message: "Profile updated successfully.",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "An error occurred while updating the profile." });
  }
};

module.exports = { saveProfile };

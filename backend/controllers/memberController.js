const Member = require('../models/Member');
const List = require('../models/List');

exports.createMember = async (req, res) => {
  const { name, listId } = req.body;
  try {
    const newMember = new Member({ name, list: listId });
    await newMember.save();
    const list = await List.findById(listId);
    list.members.push(newMember._id);
    await list.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create member' });
  }
};

exports.updateMember = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const member = await Member.findById(id);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    member.name = name || member.name;
    await member.save();
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update member' });
  }
};


exports.deleteMember = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the member
    const member = await Member.findByIdAndDelete(id);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    // Remove the member ID from any associated lists
    await List.updateMany({ members: id }, { $pull: { members: id } });

    res.json({ message: 'Member deleted successfully' });
  } catch (err) {
    console.error('Error deleting member:', err);
    res.status(500).json({ error: 'Failed to delete member' });
  }
};

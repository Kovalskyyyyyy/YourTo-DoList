const List = require('../models/List');
const Item = require('../models/Item');
const Member = require('../models/Member');
const mongoose = require('mongoose');

exports.getLists = async (req, res) => {
  try {
    const lists = await List.find();
    res.json(lists);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch lists' });
  }
};

exports.getList = async (req, res) => {
    const { id } = req.params;
    try {
      const list = await List.findById(id)
        .populate('todos')
        .populate('members');
      if (!list) return res.status(404).json({ error: 'List not found' });
      res.json(list);
    } catch (err) {
      console.error('Error fetching list:', err);
      res.status(500).json({ error: 'Failed to fetch list' });
    }
  };
  


exports.createList = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    try {
        console.log('Creating new list with name:', name);
        const newList = new List({ name });
        await newList.save();
        res.status(201).json(newList);
    } catch (err) {
        console.error('Failed to create list', err);
        res.status(500).json({ error: 'Failed to create list' });
    }
};



exports.updateList = async (req, res) => {
  const { id } = req.params;
  const { name, todos, members } = req.body;

  try {
    const list = await List.findById(id);
    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }

    if (name) list.name = name;
    if (todos) list.todos = todos;
    if (members) list.members = members;

    await list.save();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update list' });
  }
};

exports.deleteList = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Validate the list ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid List ID' });
      }
  
      console.log('Deleting list with ID:', id);
  
      // Find the list
      const list = await List.findById(id);
      if (!list) {
        console.log('List not found.');
        return res.status(404).json({ error: 'List not found' });
      }
  
      console.log('List found:', list);
  
      // Delete associated items
      const deleteItemsResult = await Item.deleteMany({ list: id });
      console.log('Deleted items:', deleteItemsResult);
  
      // Delete associated members
      const deleteMembersResult = await Member.deleteMany({ _id: { $in: list.members } });
      console.log('Deleted members:', deleteMembersResult);
  
      // Delete the list itself
      const deletedList = await List.findByIdAndDelete(id);
      if (!deletedList) {
        console.log('Failed to delete the list.');
        return res.status(404).json({ error: 'List not found' });
      }
  
      console.log('Deleted list:', deletedList);
      res.json({ message: 'List and associated items/members deleted successfully' });
    } catch (err) {
      console.error('Error deleting list:', err);
      res.status(500).json({ error: 'Failed to delete list' });
    }
  };
  

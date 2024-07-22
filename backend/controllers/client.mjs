import fs from 'fs';
import { v4 as uuid } from 'uuid';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getItems = (req, res) => {
  try {
    const data = fs.readFileSync(path.resolve(__dirname, '../db/clients.json'));
    console.log('GET items:', JSON.parse(data)); // Ajout d'un log
    res.json(JSON.parse(data));
  } catch (error) {
    res.sendStatus(500);
    console.error('Error reading clients.json:', error);
  }
};

const getItem = (req, res) => {
  try {
    const data = fs.readFileSync(path.resolve(__dirname, '../db/clients.json'));
    const items = JSON.parse(data);
    const item = items.find(item => item.idclient == req.params.id);
    if (item) {
      console.log('GET item:', item); // Ajout d'un log
      res.json(item);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(500);
    console.error('Error reading clients.json:', error);
  }
};

const patchItem = (req, res) => {
  try {
    const data = fs.readFileSync(path.resolve(__dirname, '../db/clients.json'));
    const items = JSON.parse(data);
    let index = items.findIndex(item => item.idclient == req.params.id);
    if (index !== -1) {
      items[index] = { ...items[index], ...req.body };
      fs.writeFileSync(path.resolve(__dirname, '../db/clients.json'), JSON.stringify(items, null, 2));
      console.log('PATCH item:', items[index]); // Ajout d'un log
      res.json(items[index]);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(500);
    console.error('Error updating clients.json:', error);
  }
};

const postItem = (req, res) => {
  try {
    const data = fs.readFileSync(path.resolve(__dirname, '../db/clients.json'));
    const items = JSON.parse(data);
    const newClient = { ...req.body, idclient: uuid() };
    items.push(newClient);
    fs.writeFileSync(path.resolve(__dirname, '../db/clients.json'), JSON.stringify(items, null, 2));
    console.log('POST item:', newClient); // Ajout d'un log
    res.json(newClient);
  } catch (error) {
    res.sendStatus(500);
    console.error('Error writing to clients.json:', error);
  }
};

const deleteItem = (req, res) => {
  try {
    const data = fs.readFileSync(path.resolve(__dirname, '../db/clients.json'));
    let items = JSON.parse(data);
    items = items.filter(item => item.idclient != req.params.id);
    fs.writeFileSync(path.resolve(__dirname, '../db/clients.json'), JSON.stringify(items, null, 2));
    console.log('DELETE item:', req.params.id); // Ajout d'un log
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
    console.error('Error deleting from clients.json:', error);
  }
};

export default {
  deleteItem,
  getItem,
  getItems,
  patchItem,
  postItem
};

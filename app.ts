import { Request, Response, Application } from 'express';
import express from 'express';
import { IPuppy } from 'Interface';

const app: Application = express();
app.use(express.json())

const puppies: IPuppy[] = [
  { id: 1, name: 'Buddy', breed: 'Labrador', birthdate: new Date('2018-01-01') },
  { id: 2, name: 'Max', breed: 'Poodle', birthdate: new Date('2019-05-01') },
  { id: 3, name: 'Charlie', breed: 'Labrador', birthdate: new Date('2020-08-01') },
  { id: 4, name: 'Lucy', breed: 'Golden Retriever', birthdate: new Date('2019-12-01') },
  { id: 5, name: 'Daisy', breed: 'Beagle', birthdate: new Date('2018-07-01') },
  { id: 6, name: 'Molly', breed: 'Cocker Spaniel', birthdate: new Date('2019-03-01') },
  { id: 7, name: 'Rocky', breed: 'Boxer', birthdate: new Date('2020-06-01') },
  { id: 8, name: 'Ziggy', breed: 'Bulldog', birthdate: new Date('2017-09-01') },
  { id: 9, name: 'Lola', breed: 'Pomeranian', birthdate: new Date('2018-02-01') },
];

app.get('/api/puppies', (_req: Request, res: Response) => {
  return res.status(200).json(puppies);
});

app.get('/api/puppies/:id', (_req: Request, res: Response) => {
  const id = parseInt(_req.params.id!);
  const puppy = puppies.find(p => p.id === id);
  if (puppy) {
    res.status(200).json(puppy);
  } else {
    res.status(404).send('Puppy not found');
  }
});

app.post('/api/puppies', (_req: Request, res: Response) => {
  const newPuppy: IPuppy = _req.body;
  if (!newPuppy.name || !newPuppy.breed) {
    res.status(400).send('Missing required fields');
    return;
  }
  const lastPuppy = puppies[puppies.length - 1];
  const id = lastPuppy ? lastPuppy.id + 1 : 1;
  newPuppy.id = id;
  newPuppy.birthdate = new Date('2001-02-01');
  puppies.push(newPuppy);
  res.status(201).send('Puppy added');
});

app.put('/api/puppies/:id', (_req: Request, res: Response) => {
  const id = parseInt(_req.params.id!);
  const updatedPuppy: IPuppy = _req.body;
  const puppyIndex = puppies.findIndex(p => p.id === id);
  if (puppyIndex === -1) {
    res.status(404).send('Puppy not found');
    return;
  }
  puppies[puppyIndex] = { ...puppies[puppyIndex], ...updatedPuppy };
  res.status(200).send('Puppy updated');
});

app.delete('/api/puppies/:id', (_req: express.Request, res: express.Response) => {
  const id = parseInt(_req.params.id!);
  const puppyIndex = puppies.findIndex(p => p.id === id);
  if (puppyIndex === -1) {
    res.status(404).send('Puppy not found');
    return;
  }
  puppies.splice(puppyIndex, 1);
  res.status(200).send('Puppy deleted');
});

export default app;

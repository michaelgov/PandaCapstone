import mongoose from 'mongoose';

let models = {};

main().catch(err => console.log(err))
async function main() {
  await mongoose.connect('mongodb+srv://jonnykim:1nbEtP63PsxAD8of@cluster0.y9ymbqv.mongodb.net/?retryWrites=true&w=majority');
  console.log("successfully connected to mongodb");

  const resourceSchema = new mongoose.Schema({
    title: String,
    url: String,
    date: Date,
    type: String
  });

  models.Resource = mongoose.model("Resource", resourceSchema);

  const citationSchema = new mongoose.Schema({
    title: String,
    url: String,
    date: Date
  });

  models.Citation = mongoose.model("Citation", citationSchema);

  console.log('mongoose models created');
}

export default models;
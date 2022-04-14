const isObjectIdExists = (MongoModel, ObjectId) => {
  if (MongoModel.findById(ObjectId).count() > 0) return true;
}

module.exports = {
  isObjectIdExists
}
'use strict';

const uuidv1 = require('uuid/v1');

module.exports = class LibraryManager {
  constructor(libraryRepository) {
    this.libraryRepository = libraryRepository;
  }

  createCategory(category) {
    this.verifyCategory(category);
    category.id = uuidv1();
    category.knowledges = {};
    this.libraryRepository.add(category);
  }

  createKnowledge(knowledge) {
    this.verifyKnowledge();
    var knowledgeCategory = this.libraryRepository.getById(knowledge.categoryId);
    knowledge.id = uuidv1();
    knowledgeCategory.knowledges[knowledge.id] = knowledge;
    this.libraryRepository.save(knowledgeCategory);
  }

  updateCategory(category) {
    this.verifyCategory(category);
    var categoryToUpdate = this.libraryRepository.getById(category.id);
    categoryToUpdate.name = category.name;
    this.libraryRepository.save(categoryToUpdate);
  }

  updateKnowledge(knowledge) {
    this.verifyKnowledge(knowledge);
    var categoryToUpdate = this.libraryRepository.getById(knowledge.categoryId);
    categoryToUpdate.knowledges[knowledge.id] = knowledge;
    this.libraryRepository.save(categoryToUpdate);
  }

  deleteCategory(category) {
    this.libraryRepository.delete(category.id);
  }

  deleteKnowledge(knowledge) {
    var categoryToUpdate = this.libraryRepository.getById(knowledge.categoryId);
    delete categoryToUpdate.knowledges[knowledge.id];
    this.libraryRepository.save(categoryToUpdate);
  }

  verifyCategory(favorite) {
    /*
    {
  "id": null,
  "name": "Architecture"
}
    */
  }

  verifyKnowledge(knowledge) {
    /*
{
  "id": "aaa",
  "categoryId": "aaa",
  "creator": "john@doe.fr",
  "title": "title",
  "content": "content"
}
    */
  }
}
'use strict';

const uuidv1 = require('uuid/v1');

module.exports = class LibraryManager {
  constructor(libraryRepository) {
    this.libraryRepository = libraryRepository;
  }

  getAllCategories() {
    return this.libraryRepository.getAll();
  }

  getCategoryById(id) {
    return this.libraryRepository
      .getAll()
      .filter(category => category.id === id);
  }

  getKnowledgeById(id) {
    const categories = this.libraryRepository.getAll();
    const knowledge = {};
    categories.forEach(category => {
      category.knowledges.forEach(k => {
        if (k.id === id) {
          knowledge = k;
        }
      });
    });
    return knowledge;
  }

  searchCategories(criteria) {
    let categories = this.libraryRepository.getAll();
    if (criteria.searchKeys.CategoryName)
      categories = categories.filter(category => category.name.indexOf(criteria.searchKeys.CategoryName) !== -1);
    return categories;
  }

  createCategory(category) {
    this.verifyCategory(category);
    category.id = uuidv1();
    category.knowledges = [];
    this.libraryRepository.add(category);
  }

  createKnowledge(knowledge) {
    this.verifyKnowledge();
    var knowledgeCategory = this.libraryRepository.getById(knowledge.categoryId);

    knowledge.id = uuidv1();
    if (knowledge.creator.length === 0)
      knowledge.creator = 'john@doe.fr';
    knowledgeCategory.knowledges.push(knowledge);
    this.libraryRepository.add(knowledgeCategory);
  }

  updateCategory(category) {
    this.verifyCategory(category);
    var categoryToUpdate = this.libraryRepository.getById(category.id);
    categoryToUpdate.name = category.name;
    this.libraryRepository.add(categoryToUpdate);
  }

  updateKnowledge(knowledge) {
    this.verifyKnowledge(knowledge);
    const categoryToUpdate = this.libraryRepository.getById(knowledge.categoryId);
    const knowledgeToUpdate = categoryToUpdate.knowledges.find(catKnowledge => catKnowledge.id === knowledge.id);
    if (knowledge.creator.length === 0)
      knowledgeToUpdate.creator = 'john@doe.fr';
    else
      knowledgeToUpdate.creator = knowledge.creator;
    knowledgeToUpdate.title = knowledge.title;
    knowledgeToUpdate.content = knowledge.content,
      this.libraryRepository.add(categoryToUpdate);
  }

  deleteCategory(category) {
    this.libraryRepository.delete(category);
  }

  deleteKnowledge(knowledge) {
    var categoryToUpdate = this.libraryRepository.getById(knowledge.categoryId);
    categoryToUpdate.knowledges = categoryToUpdate.knowledges.filter(k => k.id !== knowledge.id);
    this.libraryRepository.add(categoryToUpdate);
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
import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
  en: {
    translation: {
      "taskBoard": "Task Board",
      "createTask": "Create Task",
      "deleteTask": "Delete Task",
      "editTask": "Edit Task",
      "confirmDelete": "Are you sure you want to delete this task?",
      "search": "Search Tasks",
      "sortByTitle": "Sort by Title",
      "sortByDate": "Sort by Date",
      "loadMore": "Load More",
      "cancel": "Cancel",
      "save": "Save",
      "newTask": "New Task",
    },
  },
  ru: {
    translation: {
      "taskBoard": "Доска задач",
      "createTask": "Создать задачу",
      "deleteTask": "Удалить задачу",
      "editTask": "Редактировать задачу",
      "confirmDelete": "Вы уверены, что хотите удалить эту задачу?",
      "search": "Поиск по задачам",
      "sortByTitle": "Сортировать по названию",
      "sortByDate": "Сортировать по дате",
      "loadMore": "Загрузить больше",
      "cancel": "Отмена",
      "save": "Сохранить",
      "newTask": "Новая задача",
    },
  },
}

i18n
  .use(initReactI18next) // подключаем react-i18next
  .init({
    resources,
    lng: "ru", // по умолчанию будет русский язык
    interpolation: {
      escapeValue: false, // не экранируем строки
    },
  })

export default i18n

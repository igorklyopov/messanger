const USER = {
  id: USER_ID,
  name: USER_NAME,
  password: USER_PASSWORD,
  token: null,
  contacts: ['c1', 'c2', 'c3'],
  dialogs: ['d1'],
};

const CONTACTS = [
  {
    id: 'c1',
    contactname: {
      name: 'Юлия Юлина',
      avatar: './images/avatars/avatar-3.jpg',
    },
    dialogs: ['d1'],
  },
  {
    id: 'c2',
    contactname: 'Алексей Алёшин',
    dialogs: [],
  },
  {
    id: 'c3',
    contactname: 'Иван Иванов',
    dialogs: [],
  },
];

const DIALOGS = [
  {
    id: 'd1',
    image: './images/avatars/avatar-3.jpg',
    participants: [USER_NAME, 'Юлия Юлина'],
    messages: [
      {
        id: 1652183788046,
        author: {
          name: 'Юлия Юлина',
          avatar: './images/avatars/avatar-3.jpg',
        },
        message: 'Привет)',
        time: 1652183788045,
      },
      {
        id: 1652183788047,
        author: {
          name: 'Юлия Юлина',
          avatar: './images/avatars/avatar-3.jpg',
        },
        message: 'Как дела?',
        time: 1652183788046,
      },
      {
        id: 1652183848048,
        author: {
          name: USER_NAME,
          avatar: USER_AVATAR,
        },
        message: 'Привет',
        time: 1652183848047,
      },
      {
        id: 1652183848049,
        author: {
          name: USER_NAME,
          avatar: USER_AVATAR,
        },
        message: 'Норм',
        time: 1652183848048,
      },
      {
        id: 1652183908050,
        author: {
          name: 'Юлия Юлина',
          avatar: './images/avatars/avatar-3.jpg',
        },
        message: 'Чем занят?',
        time: 1652183908049,
      },
      {
        id: 1652184028051,
        author: {
          name: USER_NAME,
          avatar: USER_AVATAR,
        },
        message: 'Сажаю аллюминиевые огурцы на брезентовом поле',
        time: 1652184028050,
      },
    ],
  },
  {
    id: 'd2',
    image: './images/avatars/avatar-2.jpg',
    participants: [USER_NAME, 'Алексей Алёшин'],
    messages: [
      {
        id: 1652183788046,
        author: {
          name: 'Алексей Алёшин',
          avatar: './images/avatars/avatar-2.jpg',
        },
        message: 'Привет!',
        time: 1652183788045,
      },
      {
        id: 1652183788047,
        author: {
          name: 'Алексей Алёшин',
          avatar: './images/avatars/avatar-2.jpg',
        },
        message: 'Заработок в интернете без вложений интересует?',
        time: 1652183788046,
      },
      {
        id: 1652183788048,
        author: {
          name: USER_NAME,
          avatar: USER_AVATAR,
        },
        message: 'Привет. Нет',
        time: 1652183788047,
      },
    ],
  },
];

const contact = {
  id: null,
  contactname: '',
  dialog: null,
};

const message = {
  id: null,
  author: null,
  message: '',
  time: null,
};

const chats = {
  chat1: [
    {
      from: "them",
      text: "u showed up in my dream again...",
      responses: [{ text: "what were we doing?", nextStep: 1 }],
    },
    {
      from: "them",
      text: "all i remember is we were laying in a field, looking at the sky.",
      responses: [
        { text: "did i show u my favourite constellation?", nextStep: 2 },
      ],
    },
    {
      from: "them",
      text: "no. you started crying and i didnt know what to do :((",
      responses: [{ text: "oh....", nextStep: 3 }],
    },
    {
      from: "them",
      text: "i wish i could go back and throw stars in the sky for u. just to see u smile.",
      responses: [
        {
          text: "remember when we used to fold stars together?",
          nextStep: 4,
        },
      ],
    },
    {
      from: "them",
      text: "how could i forget.. i still have the jar of stars you gave me.",
      responses: [],
    },
    {
      from: "them",
      text: "it was so sweet of you to give me that. i still have it by my bed.",
      responses: [],
    },
    {
      from: "them",
      text: "that reminds me, i got something for u (sends rings)",
      responses: [
        {
          text: "omg!! they're beautiful!! where did u get those from?",
          nextStep: 4,
        },
      ],
    },
    {
      from: "them",
      text: "from the lady in the dream-market. i was telling her about u. she says if you give them to someone you love, you'll be able to dream together.",
      responses: [
        { text: "should we give them a try next time?", nextStep: 5 },
      ],
    },
    {
      from: "them",
      text: "i'd love to <3",
      responses: [
        { text: "okk, im gonna go to sleep now. see u soon!!", nextStep: 6 },
      ],
    },
    {
      from: "them",
      text: "<3 i'll be waiting for you",
      responses: [],
    },
  ],
  chat2: [
    {
      from: "them",
      text: "i wish i could go back and throw stars in the sky for u. just to see u smile.",
      responses: [
        {
          text: "remember when we used to fold stars together?",
          nextStep: 1,
        },
      ],
    },
    {
      from: "them",
      text: "how could i forget.. i still have the jar of stars you gave me.",
      responses: [],
    },
  ],
};

export default chats;

// tweet gpt 요청
export const fakeTweets = [
  {
    tweet: "오늘 날씨가 정말 좋네요! 산책하기 딱 좋은 날이에요.",
    created_at: "2024-08-13T09:15:30Z",
    userId: 3,
  },
  {
    tweet: "새로 나온 스마트폰 어떤가요? 구매할 만한 가치가 있을까요?",
    created_at: "2024-08-13T10:30:45Z",
    userId: 1,
  },
  {
    tweet: "오늘 저녁 메뉴 추천 부탁드려요. 뭘 먹을지 고민되네요.",
    created_at: "2024-08-13T11:45:22Z",
    userId: 5,
  },
  {
    tweet: "주식 시장이 요즘 불안정한데, 어떻게 대응해야 할까요?",
    created_at: "2024-08-13T13:20:10Z",
    userId: 2,
  },
  {
    tweet: "새로 시작한 드라마 너무 재밌어요! 다들 한 번 보세요.",
    created_at: "2024-08-13T14:55:33Z",
    userId: 6,
  },
  {
    tweet: "오늘 업무 끝! 드디어 퇴근이에요. 다들 수고하셨습니다~",
    created_at: "2024-08-13T18:00:05Z",
    userId: 4,
  },
  {
    tweet: "주말에 가족들과 캠핑 갈 예정이에요. 기대돼요!",
    created_at: "2024-08-13T19:30:40Z",
    userId: 1,
  },
  {
    tweet: "요즘 운동을 시작했는데, 건강해지는 느낌이에요.",
    created_at: "2024-08-13T20:45:15Z",
    userId: 3,
  },
  {
    tweet: "새로 나온 영화 티켓 예매했어요. 기대 중이에요!",
    created_at: "2024-08-13T21:55:50Z",
    userId: 5,
  },
  {
    tweet: "내일 중요한 미팅이 있어서 긴장되네요. 잘 될거예요, 파이팅!",
    created_at: "2024-08-13T23:10:25Z",
    userId: 2,
  },
  {
    tweet: "새벽에 일어나서 일찍 출근했어요. 오늘 하루도 화이팅!",
    created_at: "2024-08-14T05:30:00Z",
    userId: 6,
  },
  {
    tweet: "아침 운동 끝! 상쾌한 하루의 시작이에요.",
    created_at: "2024-08-14T07:15:20Z",
    userId: 4,
  },
  {
    tweet: "오늘 점심 메뉴는 샐러드로 정했어요. 건강한 하루 보내세요!",
    created_at: "2024-08-14T11:45:30Z",
    userId: 1,
  },
  {
    tweet: "새로운 프로젝트 시작! 열심히 해볼게요.",
    created_at: "2024-08-14T13:20:45Z",
    userId: 3,
  },
  {
    tweet: "오늘 저녁에 친구들과 만나기로 했어요. 즐거운 시간 보내고 올게요!",
    created_at: "2024-08-14T17:00:10Z",
    userId: 5,
  },
  {
    tweet: "요즘 독서에 빠졌어요. 추천할 만한 책 있나요?",
    created_at: "2024-08-14T19:30:55Z",
    userId: 2,
  },
  {
    tweet: "내일은 휴가에요! 여행 갈 준비 중이에요.",
    created_at: "2024-08-14T21:45:30Z",
    userId: 6,
  },
  {
    tweet: "밤늦게까지 일하느라 피곤하네요. 다들 오늘 하루 수고하셨어요!",
    created_at: "2024-08-14T23:55:40Z",
    userId: 4,
  },
  {
    tweet: "아침부터 비가 오네요. 우산 챙기세요!",
    created_at: "2024-08-15T07:10:15Z",
    userId: 1,
  },
  {
    tweet: "오늘은 재택근무day! 편하게 일할 수 있어서 좋아요.",
    created_at: "2024-08-15T09:25:50Z",
    userId: 3,
  },
  {
    tweet: "점심으로 맛있는 파스타를 먹었어요. 행복한 하루 되세요!",
    created_at: "2024-08-15T12:40:30Z",
    userId: 5,
  },
  {
    tweet: "새로 배우기 시작한 외국어가 재미있어요. 열심히 공부 중!",
    created_at: "2024-08-15T14:55:20Z",
    userId: 2,
  },
  {
    tweet: "오늘 저녁은 치킨이에요! 맛있게 먹을게요~",
    created_at: "2024-08-15T18:20:45Z",
    userId: 6,
  },
  {
    tweet: "밤에 산책하니 기분이 좋아져요. 여러분도 한 번 해보세요!",
    created_at: "2024-08-15T21:30:10Z",
    userId: 4,
  },
  {
    tweet: "내일은 중요한 발표가 있어요. 잘 할 수 있을 거예요!",
    created_at: "2024-08-15T23:45:55Z",
    userId: 1,
  },
  {
    tweet: "아침 일찍 일어나서 요가했어요. 상쾌한 아침입니다!",
    created_at: "2024-08-16T06:15:30Z",
    userId: 3,
  },
  {
    tweet: "오늘 점심은 동료들과 함께 먹어요. 즐거운 식사 시간!",
    created_at: "2024-08-16T11:30:25Z",
    userId: 5,
  },
  {
    tweet: "새로운 취미를 찾고 있어요. 추천해주실 만한 것 있나요?",
    created_at: "2024-08-16T14:45:40Z",
    userId: 2,
  },
  {
    tweet: "오늘 저녁에 콘서트 가요! 신나는 밤이 될 것 같아요.",
    created_at: "2024-08-16T18:00:15Z",
    userId: 6,
  },
  {
    tweet: "주말 계획 세우는 중이에요. 뭘 하면 좋을까요?",
    created_at: "2024-08-16T20:20:50Z",
    userId: 4,
  },
  {
    tweet: "오늘 하루도 끝! 내일은 더 좋은 날이 될 거예요.",
    created_at: "2024-08-16T23:30:35Z",
    userId: 1,
  },
  {
    tweet: "아침부터 커피 한잔으로 시작하는 하루! 좋은 아침이에요.",
    created_at: "2024-08-17T07:45:10Z",
    userId: 3,
  },
  {
    tweet: "주말에 대청소 했어요. 깨끗해진 집을 보니 기분이 좋네요!",
    created_at: "2024-08-17T10:55:30Z",
    userId: 5,
  },
  {
    tweet: "오늘은 가족들과 함께 영화 볼 예정이에요. 즐거운 시간 되겠어요!",
    created_at: "2024-08-17T13:10:45Z",
    userId: 2,
  },
  {
    tweet: "맛있는 디저트 만들었어요. 다들 행복한 주말 보내세요!",
    created_at: "2024-08-17T16:25:20Z",
    userId: 6,
  },
  {
    tweet: "오랜만에 운동했더니 몸이 좀 아프네요. 그래도 상쾌해요!",
    created_at: "2024-08-17T19:40:55Z",
    userId: 4,
  },
  {
    tweet: "내일부터 새로운 한 주 시작이에요. 모두 힘내세요!",
    created_at: "2024-08-17T22:50:30Z",
    userId: 1,
  },
  {
    tweet: "아침 일찍 일어나 산책했어요. 상쾌한 아침입니다!",
    created_at: "2024-08-18T06:30:15Z",
    userId: 3,
  },
  {
    tweet: "오늘은 친구들과 브런치 약속이 있어요. 맛있게 먹고 올게요!",
    created_at: "2024-08-18T09:45:40Z",
    userId: 5,
  },
  {
    tweet: "새로운 취미로 그림 그리기를 시작했어요. 재미있네요!",
    created_at: "2024-08-18T12:55:25Z",
    userId: 2,
  },
  {
    tweet: "오늘 저녁은 집에서 요리해 먹을 거예요. 뭘 만들지 고민 중이에요.",
    created_at: "2024-08-18T16:10:50Z",
    userId: 6,
  },
  {
    tweet: "내일부터 출장이에요. 잘 다녀올게요!",
    created_at: "2024-08-18T19:25:35Z",
    userId: 4,
  },
  {
    tweet: "이번 주 목표: 운동 3번 하기! 할 수 있어요, 파이팅!",
    created_at: "2024-08-18T22:40:10Z",
    userId: 1,
  },
  {
    tweet: "오늘 아침은 샌드위치로 간단히 먹었어요. 맛있네요!",
    created_at: "2024-08-19T07:20:45Z",
    userId: 3,
  },
  {
    tweet: "새로운 프로젝트 회의 중이에요. 좋은 아이디어가 나올 것 같아요!",
    created_at: "2024-08-19T10:35:30Z",
    userId: 5,
  },
  {
    tweet: "점심 시간에 잠깐 산책했어요. 기분 전환이 됐어요!",
    created_at: "2024-08-19T13:50:15Z",
    userId: 2,
  },
  {
    tweet: "오늘 퇴근 후에 헬스장 가기로 했어요. 열심히 운동할게요!",
    created_at: "2024-08-19T17:05:50Z",
    userId: 6,
  },
  {
    tweet: "저녁에 친구와 통화했어요. 오랜만에 이야기하니 좋네요.",
    created_at: "2024-08-19T20:15:25Z",
    userId: 4,
  },
  {
    tweet: "내일은 중요한 미팅이 있어요. 잘 준비해서 임할게요!",
    created_at: "2024-08-19T23:30:40Z",
    userId: 1,
  },
  {
    tweet: "아침부터 비가 오네요. 우산 잊지 마세요!",
    created_at: "2024-08-20T06:45:15Z",
    userId: 3,
  },
  {
    tweet: "오늘 점심은 동료들과 함께 먹어요. 맛있는 식사 시간 되겠어요!",
    created_at: "2024-08-20T11:55:50Z",
    userId: 5,
  },
  {
    tweet: "새로 산 책을 읽기 시작했어요. 재미있네요!",
    created_at: "2024-08-20T15:10:35Z",
    userId: 2,
  },
  {
    tweet:
      "오늘 저녁에는 요가 클래스에 참여해요. 몸과 마음이 편안해질 것 같아요.",
    created_at: "2024-08-20T18:25:20Z",
    userId: 6,
  },
  {
    tweet: "내일은 휴가에요! 잠깐의 휴식이 필요했어요.",
    created_at: "2024-08-20T21:40:55Z",
    userId: 4,
  },
  {
    tweet: "밤에 달리기했어요. 시원한 바람을 맞으니 기분이 좋아졌어요.",
    created_at: "2024-08-20T23:55:30Z",
    userId: 1,
  },
  {
    tweet: "Exploring the city today, found a hidden gem! 🏙️",
    created_at: "2024-03-15T00:00:00.000Z",
    userId: 3,
  },
  {
    tweet: "Morning coffee with a view. Can't get enough! ☕️",
    created_at: "2023-11-10T00:00:00.000Z",
    userId: 5,
  },
  {
    tweet: "Finally finished that DIY project. Turned out great! 🔨",
    created_at: "2024-06-05T00:00:00.000Z",
    userId: 1,
  },
  {
    tweet: "Weekend getaway with friends. Much needed! 🌄",
    created_at: "2024-01-28T00:00:00.000Z",
    userId: 4,
  },
  {
    tweet: "Just got back from a fantastic concert! 🎶",
    created_at: "2023-09-03T00:00:00.000Z",
    userId: 2,
  },
  {
    tweet: "Trying out a new workout routine today. Wish me luck! 💪",
    created_at: "2024-02-18T00:00:00.000Z",
    userId: 6,
  },
  {
    tweet: "Celebrating a small victory today. Every win counts! 🥳",
    created_at: "2023-12-22T00:00:00.000Z",
    userId: 4,
  },
  {
    tweet: "Spontaneous road trip was the best decision! 🚗",
    created_at: "2024-07-11T00:00:00.000Z",
    userId: 1,
  },
  {
    tweet: "Cooked up a storm in the kitchen tonight. Delicious! 🍳",
    created_at: "2023-04-25T00:00:00.000Z",
    userId: 3,
  },
  {
    tweet: "Reading by the fireplace, the perfect winter evening. 📖",
    created_at: "2023-12-14T00:00:00.000Z",
    userId: 5,
  },
  {
    tweet: "Discovered a new hobby today. So excited to learn more! 🎨",
    created_at: "2024-05-30T00:00:00.000Z",
    userId: 6,
  },
  {
    tweet: "Can't stop listening to this new album. On repeat! 🎧",
    created_at: "2023-07-19T00:00:00.000Z",
    userId: 2,
  },
  {
    tweet: "Feeling grateful for the little things today. 🙏",
    created_at: "2024-01-06T00:00:00.000Z",
    userId: 1,
  },
  {
    tweet: "Weekend plans: binge-watching my favorite series. 📺",
    created_at: "2024-03-09T00:00:00.000Z",
    userId: 4,
  },
  {
    tweet: "Just finished a 10K run, feeling accomplished! 🏃‍♀️",
    created_at: "2023-05-21T00:00:00.000Z",
    userId: 3,
  },
  {
    tweet: "Enjoying some quiet time by the lake. So peaceful. 🌅",
    created_at: "2024-06-23T00:00:00.000Z",
    userId: 5,
  },
  {
    tweet: "Bought tickets to see a play this weekend. Can't wait! 🎭",
    created_at: "2024-07-07T00:00:00.000Z",
    userId: 2,
  },
  {
    tweet: "Started learning a new language today. Excited for the journey! 🌍",
    created_at: "2023-08-29T00:00:00.000Z",
    userId: 6,
  },
  {
    tweet: "Found the perfect spot for a summer picnic. 🍉",
    created_at: "2024-05-02T00:00:00.000Z",
    userId: 4,
  },
  {
    tweet: "Spent the day at the museum. So much inspiration! 🎨",
    created_at: "2023-10-17T00:00:00.000Z",
    userId: 1,
  },
];

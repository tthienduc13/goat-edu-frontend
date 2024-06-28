import { Theory } from "./_components/theory";

const LessonPage = () => {
  return (
    <div className=" flex flex-col w-full gap-y-6 pb-4">
      <h2 className="scroll-m-20 mx-auto text-4xl font-medium tracking-tight first:mt-0">
        Toán 12 Bài 1 : Sự đồng biến, nghịch biến của hàm số
      </h2>
      {/* <Tabs defaultValue="theory" className="w-full">
        <div className="w-full flex justify-center pb-4 border-b">
          <TabsList>
            <TabsTrigger value="theory">Theory</TabsTrigger>
            <TabsTrigger value="flashcard">Flashcard</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="theory">
          <Theory />
        </TabsContent>
        <TabsContent value="flashcard">Change your password here.</TabsContent>
        <TabsContent value="quiz">Change your password here.</TabsContent>
      </Tabs> */}
      <Theory />
      {/* <div className="flex flex-col gap-y-3 w-full">
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          1.Tóm tắt lý thuyết
        </h3>
        <div className="gap-y-3 px-4 flex flex-col items-start w-full">
          <div className="flex flex-col">
            <h4 className="scroll-m-20 text-lg font-medium tracking-tight">
              1.1 Định nghĩa
            </h4>
            <p>
              Jokester began sneaking into the castle in the middle of the night
              and leaving jokes all over the place: under the kings pillow, in
              his soup, even in the royal toilet. The king was furious, but he
              couldnt seem to stop Jokester. And then, one day, the people of
              the kingdom discovered that the jokes left by Jokester were so
              funny that they couldnt help but laugh. And once they started
              laughing, they couldnt stop.
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="scroll-m-20 text-lg font-medium tracking-tight">
              1.2 Điều kiện cần để tham số đơn điệu
            </h4>
            <p>
              Jokester began sneaking into the castle in the middle of the night
              and leaving jokes all over the place: under the kings pillow, in
              his soup, even in the royal toilet. The king was furious, but he
              couldnt seem to stop Jokester. And then, one day, the people of
              the kingdom discovered that the jokes left by Jokester were so
              funny that they couldnt help but laugh. And once they started
              laughing, they couldnt stop.
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default LessonPage;

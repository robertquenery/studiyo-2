import Image from "next/image";

export default function AboutUsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Studiyo – Learn. Talk. Play.</h1>
      <p className="text-lg leading-relaxed">
        Studiyo is an innovative online school platform that transforms education into a social and gamified experience. Designed for students and educators, Studiyo combines quizzes, leaderboards, messaging, and interactive challenges to make learning fun, collaborative, and rewarding. Our mission is to create a future where learning is not just educational—but engaging, exciting, and empowering.
      </p>
      <hr className="border-gray-300 dark:border-gray-700 my-8" />
      <section>
        <h2 className="text-2xl font-semibold mb-6">VISION</h2>
        <p className="text-lg leading-relaxed">
          To revolutionize the online learning experience by creating Studiyo—an engaging, gamified, and interactive web platform that combines social messaging, educational games, and personalized learning for students. The goal is to make learning not just accessible, but fun, collaborative, and challenge-driven.
        </p>
      </section>
      <hr className="border-gray-300 dark:border-gray-700 my-8" />
      <section>
        <h2 className="text-2xl font-semibold mb-6">OUR TEAM</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          <div className="flex items-center space-x-6">
            <Image
              src="https://i.imgur.com/QDGQrat.png"
              alt="Jasmin Angel Bartolome"
              width={112}
              height={112}
              className="rounded-full object-cover shadow-lg"
            />
            <div>
              <p className="text-xl font-semibold">Jasmin Angel Bartolome</p>
              <p className="text-gray-700 dark:text-gray-300">Product Owner</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <Image
              src="https://i.imgur.com/yYAlzfi.png"
              alt="Jashanpreet Kaur"
              width={112}
              height={112}
              className="rounded-full object-cover shadow-lg"
            />
            <div>
              <p className="text-xl font-semibold">Jashanpreet Kaur</p>
              <p className="text-gray-700 dark:text-gray-300">Scrum Master</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <Image
              src="https://i.imgur.com/IIfixjS.png"
              alt="Robert John Quenery"
              width={112}
              height={112}
              className="rounded-full object-cover shadow-lg"
            />
            <div>
              <p className="text-xl font-semibold">Robert John Quenery</p>
              <p className="text-gray-700 dark:text-gray-300">Design Lead</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <Image
              src="https://i.imgur.com/Omk3H9I.png"
              alt="Arvin Jake Garcia"
              width={112}
              height={112}
              className="rounded-full object-cover shadow-lg"
            />
            <div>
              <p className="text-xl font-semibold">Arvin Jake Garcia</p>
              <p className="text-gray-700 dark:text-gray-300">Development Lead</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ProfilePage({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1>Profile</h1>
      <hr />

      <p className="text-2xl">
        ProfilePage{" "}
        <span className="text-4xl text-fuchsia-900 rounded-3xl bg-green-800">
          {params.id}
        </span>{" "}
      </p>
    </div>
  );
}

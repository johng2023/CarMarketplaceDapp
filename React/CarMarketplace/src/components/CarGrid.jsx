import Card from "./Card";
import Header from "./Header";

export default function CarGrid({ cars }) {
  return (
    <>
      <Header></Header>

      <div className="flex justify-center items-center m-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
      </div>
    </>
  );
}

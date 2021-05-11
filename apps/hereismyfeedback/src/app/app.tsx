import { useGlobal } from "../GlobalProvider";
import { Input } from "./components/Input";
import { Card } from "./components/Card";
import { NoShell } from "./components/NoShell";
import { Select } from "./components/Select";
import { Button } from "./components/Button";

export function App() {
  const { connect, accessToken } = useGlobal();
  const socket = connect(accessToken);
  socket.on("news", function (data) {
    console.log(data);
  });

  return (
    <NoShell>
      <Card>
        <h1 className="text-2xl font-bold mb-8">Form With Floating Labels</h1>
        <form id="form" noValidate>
          <div className="relative z-0 w-full mb-5">
            <Input placeholder={"Enter name"} label={"some label"} />
            <Input type="email" placeholder={"Enter email"} />
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
            />
            <Select options={[{ value: "1", label: "1" }]} />
          </div>

          <Button text={"Submit"} />
        </form>
      </Card>
    </NoShell>
  );
}

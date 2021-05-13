import { useGlobal } from "../GlobalProvider";
import { Input } from "./components/Input";
import { Card } from "./components/Card";
import { NoShell } from "./components/NoShell";
import { Select } from "./components/Select";
import { ButtonFlat, Typography } from "@hekori/uikit";

export function App() {
  const { connect, accessToken } = useGlobal();
  const socket = connect(accessToken);
  socket.on("news", function (data) {
    console.log(data);
  });

  return (
    <NoShell>
      <Card>
        <Typography type="h1">Form With Floating Labels</Typography>
        <form id="form" noValidate>
          <div className="relative z-0 w-full mb-5">
            <Input placeholder={"Enter name"} label={"some label"} />
            <Input type="email" placeholder={"Enter email"} />
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
            />
            <Select
              options={[
                { value: "1", label: "1" },
                { value: "2", label: "2" },
              ]}
            />
          </div>

          <ButtonFlat text={"Submit"} />
        </form>
      </Card>
    </NoShell>
  );
}

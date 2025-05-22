import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { testSchema } from "./lib/yup/schema";

interface IDefaultValues {
  example: string;
  email: string;
  phoneNumber: string;
}

function App() {
  const defaultValues: IDefaultValues = {
    example: "",
    email: "",
    phoneNumber: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDefaultValues>({
    defaultValues,
    resolver: yupResolver(testSchema),
  });
  const onSubmit: SubmitHandler<IDefaultValues> = (data) => console.log(data);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexFlow: "column",
          gap: "1rem",
        }}
      >
        <label htmlFor="example">example</label>
        <input id="example" defaultValue="test" {...register("example")} />
        {errors.example && <span>{errors.example.message}</span>}

        <label htmlFor="email">email</label>
        <input id="email" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}

        <label htmlFor="phoneNumber">phoneNumber</label>
        <input id="phoneNumber" {...register("phoneNumber")} />
        {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}

        <input type="submit" />
      </form>
    </div>
  );
}

export default App;

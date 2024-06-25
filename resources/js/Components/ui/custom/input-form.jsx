import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { Input } from "../input";

const InputForm = ({ name, form, label, type, ...props }) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={label}
              type={type}
              {...props}
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputForm;

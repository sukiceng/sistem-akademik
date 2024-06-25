import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";

const InputSelect = ({ name, form, label, placeholder, data, ...props }) => {
  // Create a map from value to label for quick lookup
  if (data) {
    const valueToLabelMap = data.reduce((acc, item) => {
      acc[item.value] = item.label;
      return acc;
    }, {});
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            {...props}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder || label} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data.map((item, index) => (
                <div
                  className=""
                  key={index}
                >
                  <SelectItem value={String(item.value)}>{item.label}</SelectItem>
                </div>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputSelect;

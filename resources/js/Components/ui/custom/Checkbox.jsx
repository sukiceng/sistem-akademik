export default function Checkbox({ className = "", ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                "rounded border-gray-300 text-slate-900 shadow-sm focus:ring-slate-900 " +
                className
            }
        />
    );
}

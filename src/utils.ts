export const getClassFromProps = (componentName: string, { className, ...props }: any = {}) =>
{
	if(className)
		componentName += ` ${className}`;
	for (let prop in props)
	{
		if (typeof props[prop] === "string")
			componentName += ` ${prop}-${props[prop]}`;
		else if (props[prop] === true || !!props[prop])
			componentName += ` ${prop}`;
	}
	return toSnakeCase(componentName);
}

export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1, str.length).toLowerCase();

export const toSnakeCase = (str: string, separator: string = "-") => str.split("").map((l, i) => 
{
	if (i !== 0 && /^[a-z0-9]+$/i.test(l) && l.toUpperCase() === l)
		return `${separator}${l}`;
	return l;
}).join("").toLowerCase();

export const toCamelCase = (str: string) => 
{
	let s = "";
	const arr = str.split("");
	for (let i = 0, l = arr.length; i < l; i++)
	{
		if(arr[i] == " ")
			s += " ";
		else if (/^[a-z0-9]+$/i.test(str[i]))
		{
			if (i !== 0 && /_|-/i.test(str[i - 1]))
				s += arr[i].toUpperCase();
			else
				s += arr[i].toLowerCase();
		}
	}
	return s;
}

export type ReactHTMLProps<T = HTMLDivElement> = React.DetailedHTMLProps<React.HTMLAttributes<T>, T>;
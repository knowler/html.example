import { Hono } from "jsr:@hono/hono";

const app = new Hono();
const VOID_ELEMENTS = [
	"area",
	"base",
	"br",
	"col",
	"embed",
	"hr",
	"img",
	"input",
	"link",
	"meta",
	"source",
	"track",
	"wbr",
];

app.get(":element", (c) => {
	const { element } = c.req.param();
	const { textContent, ...attributesList } = c.req.query();
	const attributes = Object.entries(attributesList).map(([attribute, value]) => `${attribute}="${value}"`).join(" ");
	return c.html(`
		<!doctype html>
		<meta name=color-scheme content="light dark">
		<meta name=viewport content=width=device-width,initial-scale=1>
		<title>${attributes ? `<${element} ${attributes}>` : `<${element}>`}</title>
		${VOID_ELEMENTS.includes(element) ? `<${element} ${attributes}>` : `<${element} ${attributes}>${textContent ?? ""}</${element}>`}
	`);
});

export default app;

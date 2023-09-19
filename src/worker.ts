/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	DB: D1Database;
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
}

export default {
	async fetch(request: Request, env: Env) {
		const { pathname } = new URL(request.url);

		if (pathname === '/api/customers') {
			const { results } = await env.DB.prepare('SELECT * FROM Customers').all();
			const res = Response.json(results);
			res.headers.set('Access-Control-Allow-Method', 'GET');
			res.headers.set('Access-Control-Allow-Origin', '*');
			return res;
		}

		// if (pathname === '/api/beverages') {
		// 	// If you did not use `DB` as your binding name, change it here
		// 	const { results } = await env.DB.prepare('SELECT * FROM Customers WHERE CompanyName = ?').bind('Bs Beverages').all();
		// 	return Response.json(results);
		// }

		return new Response('Call /api/customers to see everyone');
	},

	// async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
	// 	const body = JSON.stringify({ message: 'Hello Cloudflare Workers!' });
	// 	const res = new Response(body, { headers: { 'content-type': 'text/json' } });
	// 	res.headers.set('Access-Control-Allow-Method', 'GET');
	// 	res.headers.set('Access-Control-Allow-Origin', '*');
	// 	return res;
	// },
};

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { APIClient, UInt64 } from "@greymass/eosio"

const client = new APIClient({url: "https://eos.api.eosnation.io"});

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const table = await client.v1.chain.get_table_rows({
    code: "atomicassets",
    scope: "pomelo",
    table: "templates",
    json: true,
    upper_bound: UInt64.from(6659),
    lower_bound: UInt64.from(6659)
  })

  const { template_id, schema_name, issued_supply } = table.rows[0];
  res.status(200).json({ template_id, schema_name, issued_supply });
}

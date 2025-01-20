"use client";

import { useState, useEffect } from "react";

import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { client } from "./client";
import { holesky } from "./chains/index";

import axios from "axios";

import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { toEther } from "thirdweb/utils";


interface Token {
  address: string;
  symbol: string;
  value: string;
}

const url = process.env.NEXT_PUBLIC_EXP_BLOCKSCOUNT_URL;

export default function Home() {
  const account = useActiveAccount();
  const { data: balance } = useWalletBalance({
    client,
    chain: holesky,
    address: account?.address,
  });

  const [tokens, setTokens] = useState<Token[]>([]);

  const fetchTokens = async () => {
    try {
      const response = await axios.get(
        `${url}/api/v2/addresses/${account?.address}/tokens?type=ERC-20`
      );
      const extracData: Token[] = response.data.items.map((item: any) => ({
        address: item.token.address,
        symbol: item.token.symbol,
        value: item.value,
      }));
      setTokens(extracData);
    } catch (error) {
      console.error("Error fetching tokens", error);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, [account, balance, tokens]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <Typography variant="h6">
            Wallet address: {account?.address || "Loading..."}
          </Typography>
          <Typography variant="h6">
            Wallet balance:{" "}
            {balance
              ? `${balance.displayValue} ${balance.symbol}`
              : "Loading..."}
          </Typography>
        </div>

        <div>
          {tokens.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Symbol</strong></TableCell>
                    <TableCell><strong>Address</strong></TableCell>
                    <TableCell><strong>Value</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tokens.map((token, index) => (
                    <TableRow key={index}>
                      <TableCell>{token.symbol}</TableCell>
                      <TableCell>{token.address}</TableCell>
                      <TableCell>{toEther(BigInt(token.value))}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body1">Loading tokens...</Typography>
          )}
        </div>
      </main>
    </div>
  );
}

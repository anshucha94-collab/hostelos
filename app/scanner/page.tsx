"use client";

import { useEffect, useState } from "react";

import QRCode from "react-qr-code";

import { QrReader } from "react-qr-reader";

export default function ScannerPage() {
  const [students, setStudents] =
    useState<any[]>([]);

  const [scanResult, setScanResult] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    fetch(
      "https://hostelos-ld1n.onrender.com/students"
    )
      .then((res) => res.json())
      .then((data) =>
        setStudents(data)
      );
  }, []);

  const handleScan = async (
    data: string
  ) => {
    if (!data || loading) return;

    setLoading(true);

    setScanResult(data);

    try {
      const response = await fetch(
        "https://hostelos-ld1n.onrender.com/scan",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            studentId:
              Number(data),
          }),
        }
      );
}
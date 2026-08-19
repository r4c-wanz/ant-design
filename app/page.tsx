"use client";

import { ExclamationCircleFilled, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import type { TableProps } from "antd";
import { Modal, message } from "antd";
import { useState } from "react";

interface Transaction {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  amount: number;
  method: string;
  bank: string | null;
  type: "Deposit" | "Withdrawal";
  status: "SUCCESS" | "PENDING" | "FAILED";
  createdAt: string;
  processedAt: string | null;
  approvedBy: string | null;
  reference: string;
}

const getColumns = (
  onDeleteOne: (record: Transaction) => void,
): TableProps<Transaction>["columns"] => [
  {
    title: "Transaction ID",
    dataIndex: "id",
    key: "id",
    render: (_, record) => <span className="text-gray-600">{record.id}</span>,
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
    render: (_, record) => (
      <span className="font-semibold">{record.customer.name}</span>
    ),
  },
  {
    title: "Email",
    dataIndex: "customer",
    key: "customer",
    render: (_, record) => (
      <span className="text-gray-600">{record.customer.email}</span>
    ),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (_, record) => (
      <span className="font-semibold">
        Rp {record.amount.toLocaleString("id-ID") ?? 0}
      </span>
    ),
  },
  {
    title: "Method",
    dataIndex: "method",
    key: "method",
    render: (_, record) => <span className="">{record.method}</span>,
  },
  {
    title: "Bank",
    dataIndex: "bank",
    key: "bank",
    render: (_, record) => {
      if (record.bank === null)
        return <span className="text-gray-500 italic">Not Applicable</span>;
      return <span className="">{record.bank}</span>;
    },
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (_, record) => {
      if (record.type === "Deposit")
        return (
          <span className="rounded-full border border-blue-300 bg-blue-100 px-3 py-1 font-semibold text-blue-500">
            Deposit
          </span>
        );
      return (
        <span className="rounded-full border border-purple-300 bg-purple-100 px-3 py-1 font-semibold text-purple-500">
          Withdrawal
        </span>
      );
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_, record) => {
      if (record.status === "PENDING")
        return (
          <span className="rounded-full border border-orange-300 bg-orange-100 px-3 py-1 font-semibold text-orange-500">
            PENDING
          </span>
        );
      if (record.status === "FAILED")
        return (
          <span className="rounded-full border border-red-300 bg-red-100 px-3 py-1 font-semibold text-red-500">
            FAILED
          </span>
        );
      return (
        <span className="rounded-full border border-green-300 bg-green-100 px-3 py-1 font-semibold text-green-500">
          SUCCESS
        </span>
      );
    },
  },
  {
    title: "Processed By",
    dataIndex: "approvedBy",
    key: "approvedBy",
    render: (_, record) => {
      if (record.approvedBy === null && record.status === "PENDING")
        return <span className="text-orange-500">Waiting for approval</span>;
      if (record.approvedBy === null && record.status === "FAILED")
        return <span className="text-red-500">Transaction failed</span>;
      return <span className="">Approved by: {record.approvedBy}</span>;
    },
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (_, record) => (
      <Space size={"medium"}>
        <Button variant="outlined" onClick={() => alert(record.id)}>
          Detail
        </Button>
        {record.status !== "PENDING" && (
          <Button
            color="danger"
            variant="outlined"
            onClick={() => onDeleteOne(record)}
          >
            Delete
          </Button>
        )}
      </Space>
    ),
  },
];

const transactionsData: Transaction[] = [
  {
    id: "TRX-20260801-001",
    customer: { name: "Andi Pratama", email: "andi.pratama@email.com" },
    amount: 1250000,
    method: "Bank Transfer",
    bank: "BCA",
    type: "Deposit",
    status: "SUCCESS",
    createdAt: "2026-08-01 09:15:23",
    processedAt: "2026-08-01 09:16:02",
    approvedBy: "Admin Finance",
    reference: "BCA-889231",
  },
  {
    id: "TRX-20260801-002",
    customer: { name: "Siti Aisyah", email: "siti.aisyah@email.com" },
    amount: 750000,
    method: "E-Wallet",
    bank: null,
    type: "Withdrawal",
    status: "PENDING",
    createdAt: "2026-08-01 10:22:41",
    processedAt: null,
    approvedBy: null,
    reference: "EW-123812",
  },
  {
    id: "TRX-20260801-003",
    customer: { name: "Budi Santoso", email: "budi.santoso@email.com" },
    amount: 2500000,
    method: "Bank Transfer",
    bank: "Mandiri",
    type: "Deposit",
    status: "FAILED",
    createdAt: "2026-08-01 11:03:12",
    processedAt: "2026-08-01 11:04:01",
    approvedBy: null,
    reference: "MDR-551920",
  },
  {
    id: "TRX-20260802-004",
    customer: { name: "Citra Lestari", email: "citra.lestari@email.com" },
    amount: 450000,
    method: "E-Wallet",
    bank: null,
    type: "Withdrawal",
    status: "SUCCESS",
    createdAt: "2026-08-02 08:45:19",
    processedAt: "2026-08-02 08:46:33",
    approvedBy: "Admin Operations",
    reference: "EW-992381",
  },
  {
    id: "TRX-20260802-005",
    customer: { name: "Dimas Saputra", email: "dimas.saputra@email.com" },
    amount: 3200000,
    method: "Bank Transfer",
    bank: "BRI",
    type: "Deposit",
    status: "PENDING",
    createdAt: "2026-08-02 13:12:44",
    processedAt: null,
    approvedBy: null,
    reference: "BRI-721991",
  },
  {
    id: "TRX-20260803-006",
    customer: { name: "Nabila Putri", email: "nabila.putri@email.com" },
    amount: 980000,
    method: "Bank Transfer",
    bank: "BCA",
    type: "Withdrawal",
    status: "FAILED",
    createdAt: "2026-08-03 14:27:11",
    processedAt: "2026-08-03 14:28:10",
    approvedBy: "Admin Finance",
    reference: "BCA-228811",
  },
  {
    id: "TRX-20260803-007",
    customer: { name: "Fajar Ramadhan", email: "fajar.ramadhan@email.com" },
    amount: 1750000,
    method: "E-Wallet",
    bank: null,
    type: "Deposit",
    status: "SUCCESS",
    createdAt: "2026-08-03 15:42:18",
    processedAt: "2026-08-03 15:43:01",
    approvedBy: "Admin Finance",
    reference: "EW-772901",
  },
  {
    id: "TRX-20260804-008",
    customer: { name: "Aulia Rahma", email: "aulia.rahma@email.com" },
    amount: 600000,
    method: "Bank Transfer",
    bank: "BNI",
    type: "Withdrawal",
    status: "PENDING",
    createdAt: "2026-08-04 09:18:32",
    processedAt: null,
    approvedBy: null,
    reference: "BNI-661290",
  },
  {
    id: "TRX-20260804-009",
    customer: { name: "Rizky Maulana", email: "rizky.maulana@email.com" },
    amount: 4100000,
    method: "Bank Transfer",
    bank: "Mandiri",
    type: "Deposit",
    status: "SUCCESS",
    createdAt: "2026-08-04 16:21:09",
    processedAt: "2026-08-04 16:22:45",
    approvedBy: "Admin Finance",
    reference: "MDR-883921",
  },
  {
    id: "TRX-20260805-010",
    customer: { name: "Intan Permata", email: "intan.permata@email.com" },
    amount: 850000,
    method: "E-Wallet",
    bank: null,
    type: "Withdrawal",
    status: "FAILED",
    createdAt: "2026-08-05 10:31:55",
    processedAt: "2026-08-05 10:32:27",
    approvedBy: null,
    reference: "EW-119283",
  },
];

export default function Transactions() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(transactionsData);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchText, setSearchText] = useState("");

  const rowSelection = {
    type: "checkbox" as const,
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys as React.Key[]),
  };

  const filteredTransactions = transactions.filter((t) => {
    const query = searchText.trim().toLowerCase();
    if (!query) return true;
    return (
      t.id.toLowerCase().includes(query) ||
      t.customer.name.toLowerCase().includes(query) ||
      t.customer.email.toLowerCase().includes(query)
    );
  });

  const handleDeleteSelected = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select at least one transaction to delete.");
      return;
    }

    const selectedTransactions = transactions.filter((t) =>
      selectedRowKeys.includes(t.id),
    );
    const deletable = selectedTransactions.filter(
      (t) => t.status !== "PENDING",
    );
    const nonDeletable = selectedTransactions.filter(
      (t) => t.status === "PENDING",
    );

    if (deletable.length === 0) {
      message.error(
        "Selected transactions are still PENDING and cannot be deleted.",
      );
      return;
    }

    Modal.confirm({
      title: "Delete selected transactions?",
      icon: <ExclamationCircleFilled />,
      content:
        nonDeletable.length > 0
          ? `${deletable.length} transaction(s) will be deleted. ${nonDeletable.length} PENDING transaction(s) will be skipped and cannot be deleted. This action cannot be undone.`
          : `This will permanently delete ${deletable.length} transaction(s). This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        const deletableIds = deletable.map((t) => t.id);
        const updatedTransactions = transactions.filter(
          (t) => !deletableIds.includes(t.id),
        );
        setTransactions(updatedTransactions);
        setSelectedRowKeys([]);

        message.success(`${deletable.length} transaction(s) deleted.`);
        if (nonDeletable.length > 0) {
          message.error(
            `${nonDeletable.length} PENDING transaction(s) could not be deleted.`,
          );
        }
      },
    });
  };

  const handleDeleteOne = (record: Transaction) => {
    Modal.confirm({
      title: "Delete this transaction?",
      icon: <ExclamationCircleFilled />,
      content: `This will permanently delete transaction ${record.id}. This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        setTransactions((prev) => prev.filter((t) => t.id !== record.id));
        setSelectedRowKeys((prev) => prev.filter((key) => key !== record.id));
        message.success(`Transaction ${record.id} deleted.`);
      },
    });
  };

  const columns = getColumns(handleDeleteOne);

  return (
    <div>
      <h2 className="font-semibold text-green-700">FINANCE • LIVE PREVIEW</h2>
      <h1 className="text-2xl font-bold">Transaction Management</h1>
      <p className="text-sm text-gray-500">
        Review, filter, and manage customer transactions.
      </p>
      <div className="main-content mt-6">
        <div className="head flex items-center justify-between gap-6">
          <div className="info flex gap-6 font-medium">
            <div className="">
              <p>Selected</p>
              <p>{selectedRowKeys.length}</p>
            </div>
            <div className="">
              <p>Deletable</p>
              <p>
                {
                  selectedRowKeys.filter(
                    (key) =>
                      transactions.find((t) => t.id === key)?.status !==
                      "PENDING",
                  ).length
                }
              </p>
            </div>
          </div>
          <div className="search flex gap-4">
            <div className="w-70">
              <Input
                className="font-semibold"
                placeholder="Search by ID, name, or email"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
              />
            </div>
            {selectedRowKeys.length > 0 && (
              <Button
                color="danger"
                variant="solid"
                onClick={() => handleDeleteSelected()}
              >
                Delete Selected
              </Button>
            )}
          </div>
        </div>
        <div className="mt-5 table w-full">
          <Table<Transaction>
            rowKey="id"
            rowSelection={rowSelection}
            dataSource={filteredTransactions}
            columns={columns}
            pagination={{ pageSize: 5 }}
            className="rounded-lg border border-[#E4E7EC] bg-white"
          />
        </div>
      </div>
    </div>
  );
}

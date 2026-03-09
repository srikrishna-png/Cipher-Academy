import {
    FileText,
    KeyRound,
    Lock,
    ShieldAlert,
    PenTool,
    FileJson,
    FileArchive,
    ScrollText,
    Cpu,
    Shield,
    Book,
    Zap,
    Key
} from "lucide-react";

export const TOOLS_NAV = [
    { href: "/tools/text-crypto", label: "Text Encryption", icon: FileText },
    { href: "/tools/file-crypto", label: "File Conversion", icon: Lock },
    { href: "/tools/zip-compressor", label: "Zip Compressor", icon: FileArchive },
    { href: "/tools/digital-signatures", label: "Digital Signatures", icon: PenTool },
    { href: "/tools/jwt-inspector", label: "JWT Inspector", icon: FileJson },
    { href: "/tools/steganography", label: "Steganography", icon: ShieldAlert },
    { href: "/tools/generators", label: "Key Generators", icon: KeyRound },
    { href: "/tools/entropy", label: "Entropy Tester", icon: ShieldAlert },
];

export const ACADEMY_NAV = [
    {
        title: "Fundamentals",
        links: [
            { href: "/learn/history", label: "History & Ciphers", icon: ScrollText },
        ]
    },
    {
        title: "Integrity & Auth",
        links: [
            { href: "/learn/hashing", label: "Hashing Concepts", icon: Cpu },
            { href: "/learn/hmac", label: "HMAC Deep-Dive", icon: Shield },
        ]
    },
    {
        title: "Encryption",
        links: [
            { href: "/learn/symmetric", label: "Symmetric Encryption", icon: Book },
            { href: "/learn/file-conversion", label: "File Conversion", icon: Zap },
            { href: "/learn/asymmetric", label: "Asymmetric Encryption", icon: Key },
            { href: "/learn/diffie-hellman", label: "Diffie-Hellman", icon: Zap },
        ]
    },
    {
        title: "Identity & Tokens",
        links: [
            { href: "/learn/digital-signatures", label: "Digital Signatures", icon: Shield },
            { href: "/learn/jwt-studio", label: "JWT Studio Theory", icon: Cpu },
            { href: "/learn/keygen", label: "Key Generation", icon: Key },
        ]
    },
    {
        title: "Advanced",
        links: [
            { href: "/learn/randomness", label: "Randomness & Entropy", icon: Zap },
            { href: "/learn/steganography", label: "Steganography", icon: Shield },
        ]
    }
];

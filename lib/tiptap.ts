import { Extension } from '@tiptap/core';
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Blockquote from "@tiptap/extension-blockquote";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Code from "@tiptap/extension-code";
import StarterKit from "@tiptap/starter-kit";

export const tiptapExtensions:Extension[] = [
  StarterKit as unknown as Extension ,
  Underline as unknown as Extension,
  Link.configure({ openOnClick: false }) as unknown as Extension,
  TextStyle as unknown as Extension,
  Color,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Blockquote as unknown as Extension,
  HorizontalRule as unknown as Extension,
  Code as unknown as Extension,
];

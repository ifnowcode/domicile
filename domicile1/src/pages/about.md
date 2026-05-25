# About DOMicile

DOMicile is an experiment in clarity, composability, and architectural honesty. It began as a personal exploration into what a UI framework could look like if it were built from first principles rather than inherited assumptions. Instead of chasing trends or mimicking existing libraries, DOMicile asks a simple question:

**What if the DOM itself were the framework?**

DOMicile is the answer to that question — a constructor‑driven, metadata‑centric, retained‑mode UI system that treats every widget as a transparent, inspectable object. No virtual DOM. No diffing. No magic. Just a clean, serializable tree of components that can be rendered, inspected, edited, and even compiled to HTML.

---

## Why DOMicile Exists

Most UI frameworks hide their internal machinery. DOMicile does the opposite. It exposes everything:

  * Every widget is a class.

  * Every class declares its metadata.

  * Every metadata object is serializable.

  * Every render is deterministic.

  * Every update is explicit.

This makes DOMicile ideal for:

  * visual editors

  * CMS integrations

  * static site generation

  * server‑side rendering

  * debugging and introspection

  * educational tools

  * long‑term maintainability

DOMicile isn’t trying to replace React or Vue. It’s trying to explore a different path — one where the DOM is not an afterthought but the foundation.

---

## Core Principles

### 1. Constructor‑Driven Widgets

Widgets are created through constructors, not templates. This keeps structure explicit and predictable.

### 2. Metadata as the Source of Truth

Every widget carries a metadata object describing its tag, props, CSS, and children. This metadata can be saved, edited, merged, or transmitted.

### 3. Retained‑Mode Rendering

DOMicile doesn’t re-render the world. It updates only what needs to change, preserving DOM stability and making debugging effortless.

### 4. Editor‑Friendly by Design

Because everything is serializable, DOMicile is naturally suited for low‑code and no‑code environments. Editors can inspect and modify widgets without hacks.

### 5. Transparency Over Magic

DOMicile avoids hidden behavior. If something happens, you can see where and why.

---

## What This Project Includes

This project is more than a framework. It’s a growing ecosystem of ideas and components:

  * **Canonical widgets** like `Box`, `Element`, `Modal`, `Table`, `Tabs`, and `ResponsiveRow`

  * A **metadata‑driven navigation system** (`BaseNavBar`, `NavBarHover`, `NavBar3`)

  * A **RESTLoader** for async data integration

  * A **static site generator pipeline** for **Markdown‑driven content**

  * A **JSON server** for clean separation of UI and backend

  * A **blog system** powered by **Markdown** and **DOMicile widgets**

  * A design philosophy that values clarity, composability, and introspection

Each piece is built to be inspectable, extendable, and future‑proof.

---

## Markdown in This Project

Markdown plays a central role in the content pipeline. Blog posts, documentation, and static pages are written in Markdown, then:

  1. Parsed at build time or runtime

  2. Converted to HTML

  3. Wrapped in DOMicile widgets

  4. Rendered into the page layout

This keeps content authoring simple while preserving the power of DOMicile’s component system.

Markdown is used for:

  * blog posts

  * documentation pages

  * static content

  * project notes

  * long‑form writing
  
  * **This page**

It’s the perfect complement to DOMicile’s structured UI model.

---

## The Vision

DOMicile is evolving into a full ecosystem:

  * A UI framework

  * A static site generator

  * A CMS‑friendly component library

  * A server‑side renderer

  * A metadata‑driven editor

  * A philosophy of building software that remains transparent and inspectable

The long‑term goal is to create a system where:

  * developers can build complex UIs

  * editors can modify content visually

  * designers can control layout through CSS

  * everything remains serializable and understandable

DOMicile is not just a framework — it’s a way of thinking about UI architecture.

---

## The Journey

This project has been shaped by breakthroughs, refactors, frustrations, and insights. Each iteration has moved closer to a system that feels inevitable — a framework that grows from the DOM rather than fighting it.

DOMicile is still evolving, but its foundation is strong:
**clarity, composability, and transparency**.

If you’re reading this page, you’re already part of that journey.

---
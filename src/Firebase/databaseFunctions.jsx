import { useContext, useState, useEffect } from "react";
import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";
import { FBCtx } from "./FBProvider";

const express = require("express");

const Ask = require("../db/models/Ask");
const { askService } = require("../services/askService");
const { wrapper } = require("../middlewares/errorHandlingWrapper");
const { writeLog } = require("../middlewares/writeLog");

const askController = {
  // 전체 게시글 조회
  getAllAsks: async (req, res) => {
    console.log("전체 게시글 조회");

    const { page = "1", limit = "8" } = req.query;

    const list = await Ask.findAll({
      page,
      limit,
      sort: {
        createdAt: -1,
      },
      populate: {
        path: "author",
        select: ["_id", "name", "imageUrl"],
      },
    });

    try {
      return res.json(list);
    } catch (err) {
      console.log(err);
      return res.status(400).send("Error");
    }
  },

  // 특정 게시글 조회
  getAskById: async (req, res, next) => {
    console.log("특정 게시글 조회");

    const { askId } = req.params;

    const ask = await Ask.get(askId).populate([
      { path: "author", select: ["_id", "name", "imageUrl"] },
    ]);

    try {
      const copyAsk = { ...ask.toJSON() };
      return res.json(copyAsk);
    } catch (err) {
      console.log(err);
      return res.status(400).send("Error");
    }
  },

  // 게시글 생성
  createAsk: async (req, res) => {
    console.log("게시글 작성");
    const ask = req.body;
    ask.author = req.currentUserId;

    try {
      const newAsk = await Ask.create(ask);
      return res.json({
        newAsk,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send("Error");
    }
  },

  // 게시글 수정
  updateAsk: async (req, res, next) => {
    console.log("게시글 수정");
    const ask = req.body;
    const { askId } = req.params;

    const getAsk = await Ask.get(askId);

    if (getAsk.author !== req.currentUserId) {
      return res.status(401).json({
        message: "수정 권한이 없습니다.",
      });
    }

    try {
      ask._id = askId;
      result = await Ask.update(ask);

      return res.json(result);
    } catch (err) {
      console.log(err);
      return res.status(400).send("Error");
    }
  },

  // 게시글 삭제
  deleteAsk: async (req, res) => {
    console.log("게시글 삭제");
    const { askId } = req.params;

    const getAsk = await Ask.get(askId);
    if (getAsk.author !== req.currentUserId) {
      return res.status(401).json({
        message: "삭제 권한이 없습니다.",
      });
    }

    await Ask.delete(askId);

    try {
      return res.json({
        id: askId,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send("Error");
    }
  },

  // 게시물 검색
  getAsksByQuestionController: async (req, res, next) => {
    try {
      const { option } = req.query;
      const { question } = req.query;
      const { page } = req.query;

      const searchedAsks = await wrapper(
        askService.getAsksByQuestionService,
        option,
        question,
        page
      );
      if (searchedAsks.errorMessage) throw new Error("게시물 조회 실패");

      if (searchedAsks.asks) {
        return res.status(404).send("게시물 없음");
      }

      writeLog("info", question, req, "질문하기 검색 성공");
      res.status(200).send(searchedAsks);
    } catch (error) {
      next(error);
    }
  },
};

exports.askController = askController;

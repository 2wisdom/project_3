const express = require("express");

const Ask = require("../db/models/Ask");
const { askService } = require("../services/askService");
const { wrapper } = require("../middlewares/errorHandlingWrapper");
const { writeLog } = require("../middlewares/writeLog");
const fs = require("fs");
const path = require("path");

const Comment = require("../db/schemas/comment");
const logger = require("../config/logger");
const { wisXFileCleanerFromUrl } = require("../libs/wisXFileCleaner");

const askController = {
  // 전체 게시글 조회
  getAllAsks: async (req, res, next) => {
    const { page = "1", limit = "6" } = req.query;

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
      logger.info("전체 게시글 조회");
      return res.json(list);
    } catch (err) {
      next(err);
    }
  },

  // 특정 게시글 조회
  getAskById: async (req, res, next) => {
    const { askId } = req.params;

    const ask = await Ask.get(askId).populate([
      { path: "author", select: ["_id", "name", "imageUrl"] },
    ]);

    try {
      if (ask == null) {
        return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
      }

      logger.info("특정 게시글 조회");
      return res.json(ask);
    } catch (err) {
      next(err);
    }
  },

  // 게시글 생성
  createAsk: async (req, res, next) => {
    const ask = req.body;
    ask.author = req.currentUserId;

    try {
      const newAsk = await Ask.create(ask);
      logger.info("게시글 작성");
      return res.json({
        newAsk,
      });
    } catch (err) {
      next(err);
    }
  },

  // 게시글 수정
  updateAsk: async (req, res, next) => {
    const ask = req.body;
    const { askId } = req.params;

    const getAsk = await Ask.get(askId);

    try {
      if (getAsk == null) {
        return res.status(404).json({
          message: "게시글을 찾을 수 없습니다.",
        });
      } else if (getAsk.author !== req.currentUserId) {
        return res.status(401).json({
          message: "수정 권한이 없습니다.",
        });
      }

      ask._id = askId;
      let result = await Ask.update(ask);

      logger.info("게시글 수정");
      return res.json(result);
    } catch (err) {
      next(err);
    }
  },

  // 게시글 삭제
  deleteAsk: async (req, res, next) => {
    const { askId } = req.params;

    const getAsk = await Ask.get(askId);

    try {
      if (getAsk == null) {
        return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
      } else if (getAsk.author !== req.currentUserId) {
        return res.status(401).json({
          message: "삭제 권한이 없습니다.",
        });
      }

      await Ask.delete(askId);
    } catch (err) {
      next(err);
    }

    // 파일 삭제
    try {
      const imageUrl = getAsk.imageUrl;
      wisXFileCleanerFromUrl(new URL(imageUrl));
    } catch (err) {
      next(err);
    }

    try {
      logger.info("게시글 삭제");
      return res.json({
        id: askId,
      });
    } catch (err) {
      next(err);
    }
  },

  // 게시물 검색
  getAsksByQuestionController: async (req, res, next) => {
    const { option } = req.query;
    const { question } = req.query;
    const { page } = req.query;
    try {
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

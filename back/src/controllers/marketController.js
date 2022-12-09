const express = require("express");
const Market = require("../db/models/Market");
const { marketService } = require("../services/marketService");
const { wrapper } = require("../middlewares/errorHandlingWrapper");
const { writeLog } = require("../middlewares/writeLog");

const fs = require("fs");
const path = require("path");

const Comment = require("../db/schemas/comment");
const logger = require("../config/logger");
const { wisXFileCleanerFromUrl } = require("../libs/wisXFileCleaner");

const marketController = {
  // 전체 게시글 조회
  getAllMarkets: async (req, res) => {
    const { page = "1", limit = "8", category } = req.query;

    const query = {};
    if (!!category) {
      query.category = category;
    }

    const list = await Market.findAll(query, {
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
      logger.error(err);
      return res.status(400).send("Error");
    }
  },

  // 특정 게시글 조회
  getMarketById: async (req, res, next) => {
    const { marketId } = req.params;

    const market = await Market.get(marketId).populate([
      { path: "author", select: ["_id", "name", "imageUrl"] },
    ]);

    try {
      const copyMarket = { ...market.toJSON() };
      logger.info("특정 게시글 조회");
      return res.json(copyMarket);
    } catch (err) {
      logger.error(err);
      return res.status(400).send("Error");
    }
  },

  // 게시글 생성
  createMarket: async (req, res) => {
    const market = req.body;
    market.author = req.currentUserId;

    try {
      const newMarket = await Market.create(market);
      logger.info("게시글 생성");
      return res.json({
        newMarket,
      });
    } catch (err) {
      logger.error(err);
      return res.status(400).send("Error");
    }
  },

  // 게시글 수정
  updateMarket: async (req, res, next) => {
    const market = req.body;
    const { marketId } = req.params;

    const getMarket = await Market.get(marketId);

    try {
      if (getMarket.author !== req.currentUserId) {
        return res.status(401).json({
          message: "수정 권한이 없습니다.",
        });
      }

      market._id = marketId;
      result = await Market.update(market);

      logger.info("게시글 수정");
      return res.json(result);
    } catch (err) {
      logger.error(err);
      return res.status(400).send("Error");
    }
  },

  // 판매 완료
  soldOutMarket: async (req, res) => {
    const market = req.body;
    const { marketId } = req.params;

    const getMarket = await Market.get(marketId);

    try {
      if (getMarket.author !== req.currentUserId) {
        return res.status(401).json({
          message: "수정 권한이 없습니다.",
        });
      }

      market._id = marketId;
      result = await Market.update(market);

      logger.info("판매 완료!");
      return res.json(result);
    } catch (err) {
      logger.error(err);
      return res.status(400).send("Error");
    }
  },

  // 게시글 삭제
  deleteMarket: async (req, res, next) => {
    const { marketId } = req.params;

    const getMarket = await Market.get(marketId);

    try {
      if (getMarket.author !== req.currentUserId) {
        return res.status(401).json({
          message: "삭제 권한이 없습니다.",
        });
      }

      await Market.delete(marketId);
    } catch (err) {
      next(err);
    }

    // 파일 삭제
    try {
      const imageUrl = getMarket.imageUrl;
      wisXFileCleanerFromUrl(new URL(imageUrl));
    } catch (err) {
      logger.error(err);
    }

    try {
      logger.info("게시글 삭제");
      return res.json({
        id: marketId,
      });
    } catch (err) {
      logger.error(err);
      return res.status(400).send("Error");
    }
  },

  // 게시물 검색
  getMarketsByQuestionController: async (req, res, next) => {
    const { option } = req.query;
    const { question } = req.query;
    const { page } = req.query;
    try {
      const searchedMarkets = await wrapper(
        marketService.getMarketsByQuestionService,
        option,
        question,
        page
      );

      if (searchedMarkets.errorMessage) throw new Error("게시물 조회 실패");

      if (searchedMarkets.markets) {
        return res.status(404).send("게시물 없음");
      }

      writeLog("info", question, req, "마켓 검색 성공");
      res.status(200).send(searchedMarkets);
    } catch (error) {
      next(error);
    }
  },
};

exports.marketController = marketController;

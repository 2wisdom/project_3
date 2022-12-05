const express = require("express");
const Market = require("../db/models/Market");
const { marketService } = require("../services/marketService");

const marketController = {
  // 전체 게시글 조회
  getAllMarkets: async (req, res) => {
    console.log("전체 게시글 조회");

    const { page = "1", limit = "8" } = req.query;

    const list = await Market.findAll({
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
  getMarketById: async (req, res, next) => {
    console.log("특정 게시글 조회");

    const { marketId } = req.params;

    const market = await Market.get(marketId).populate([
      { path: "author", select: ["_id", "name", "imageUrl"] },
    ]);

    try {
      const copyMarket = { ...market.toJSON() };
      return res.json(copyMarket);
    } catch (err) {
      console.log(err);
      return res.status(400).send("Error");
    }
  },

  // 게시글 생성
  createMarket: async (req, res) => {
    console.log("게시글 작성");
    const market = req.body;
    market.author = req.currentUserId;

    try {
      const newMarket = await Market.create(market);
      return res.json({
        newMarket,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send("Error");
    }
  },

  // 게시글 수정
  updateMarket: async (req, res, next) => {
    console.log("게시글 수정");
    const market = req.body;
    const { marketId } = req.params;

    const getMarket = await Market.get(marketId);

    if (getMarket.author !== req.currentUserId) {
      return res.status(401).json({
        message: "수정 권한이 없습니다.",
      });
    }

    try {
      let result = null;
      market._id = marketId;
      result = await Market.update(market);

      return res.json(result);
    } catch (err) {
      console.log(err);
      return res.status(400).send("Error");
    }
  },

  // 게시글 삭제
  deleteMarket: async (req, res) => {
    console.log("게시글 삭제");
    const { marketId } = req.params;

    const getMarket = await Market.get(marketId);
    if (getMarket.author !== req.currentUserId) {
      return res.status(401).json({
        message: "삭제 권한이 없습니다.",
      });
    }

    await Market.delete(marketId);

    try {
      return res.json({
        id: marketId,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send("Error");
    }
  },

  // 게시물 검색
  getMarketsByQuestionController: async (req, res, next) => {
    try {
      const { option } = req.query;
      const { question } = req.query;
      const { page } = req.query;

      const searchedMarkets = await marketService.getMarketsByQuestionService(
        option,
        question,
        page
      );
      if (searchedMarkets.errorMessage) throw new Error("게시물 조회 실패");

      if (searchedMarkets.markets) {
        return res.status(200).send("게시물 없음");
      }

      res.status(200).send(searchedMarkets);
    } catch (error) {
      next(error);
    }
  },
};

exports.marketController = marketController;

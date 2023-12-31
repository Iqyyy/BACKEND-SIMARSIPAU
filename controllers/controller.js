const { Services } = require("../services");
const { responseHelper } = require("../helper");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await Services.login(username, password);
    if (result instanceof Error) {
      throw new Error(result);
    }
    res
      .cookie(("token", result.token), ("level", result.level_user_id))
      .status(responseHelper.status.success)
      .send(result);
  } catch (error) {
    res.status(responseHelper.status.error).json(error.message);
  }
};

const home = async (req, res) => {
  try {
    const result = await Services.home();
    if (result instanceof Error) {
      throw new Error(result);
    }
    res.status(responseHelper.status.success).json(result);
  } catch (error) {
    res.status(responseHelper.status.error).json(error.message);
  }
};

const dashboardData = async (req, res) => {
  try {
    const result = await Services.dashboardData();
    if (result instanceof Error) {
      throw new Error(result);
    }
    res.status(responseHelper.status.success).json(result);
  } catch (error) {
    res.status(responseHelper.status.error).json(error.message);
  }
};

const catalogData = async (req, res) => {
  try {
    const result = await Services.catalogData();
    if (result instanceof Error) {
      throw new Error(result);
    }
    res.status(responseHelper.status.success).json(result);
  } catch (error) {
    res.status(responseHelper.status.error).json(error.message);
  }
};

const terbaru = async (req, res) => {
  try {
    const result = await Services.terbaru();
    if (result instanceof Error) {
      throw new Error(result);
    }
    res.status(responseHelper.status.success).json(result);
  } catch (error) {
    res.status(responseHelper.status.error).json(error.message);
  }
};

const archive_by_category = async (req, res) => {
  try {
    const { archive_catalog_id } = req.body;
    const result = await Services.archive_by_category(archive_catalog_id);
    if (result instanceof Error) {
      throw new Error(result);
    }
    res.status(responseHelper.status.success).json(result);
  } catch (error) {
    res.status(responseHelper.status.error).json(error.message);
  }
};

const add_archive = async (req, res) => {
  try {
    const user_id = req.verified;

    console.log(user_id);

    console.log(req.body);

    const {
      archive_file,
      archive_code,
      archive_catalog_id,
      archive_serial_number,
      archive_file_number,
      archive_title,
      archive_release_date,
      archive_condition_id,
      archive_type_id,
      archive_class_id,
      archive_agency,
      archive_loc_building_id,
      archive_loc_room_id,
      archive_loc_rollopack_id,
      archive_loc_cabinet,
      archive_loc_rack,
      archive_loc_box,
    } = req.body.data;

    // const fileBuffer = Buffer.from(archive_file, "base64");

    const result = await Services.add_archive(
      archive_file,
      archive_code,
      archive_catalog_id,
      archive_serial_number,
      archive_file_number,
      archive_title,
      archive_release_date,
      archive_condition_id,
      archive_type_id,
      archive_class_id,
      archive_agency,
      user_id,
      archive_loc_building_id,
      archive_loc_room_id,
      archive_loc_rollopack_id,
      archive_loc_cabinet,
      archive_loc_rack,
      archive_loc_box
    );

    if (result instanceof Error) {
      throw new Error(result);
    }
    res.status(responseHelper.status.success).json(result);
  } catch (error) {
    res.status(responseHelper.status.error).json(error.message);
  }
};

const archiveDetail = async (req, res) => {
  try {
    const { archive_id } = req.body;
    const result = await Services.archiveDetail(archive_id);
    if (result instanceof Error) {
      throw new Error(result);
    }
    res.status(responseHelper.status.success).json(result);
  } catch (error) {
    res.status(responseHelper.status.error).json(error.message);
  }
};

const update_archive = async (req, res) => {
  try {
    const user_id = req.verified;

    console.log("data:", req.body.data);

    const updateData = req.body.data; // Fields to update

    console.log("DATA 1 : ", updateData);

    const result = await Services.update_archive(user_id, updateData);

    if (result instanceof Error) {
      throw new Error(result);
    }

    res.status(responseHelper.status.success).json(result);
  } catch (error) {
    res.status(responseHelper.status.error).json(error.message);
  }
};

module.exports = {
  update_archive,
};

const detail_user = async (req, res) => {
  try {
    const { user_id } = req.body;
    const result = await Services.detail_user(user_id);
    if (result instanceof Error) {
      throw new Error(result);
    }
    res.status(responseHelper.status.success).json(result);
  } catch (error) {
    res.status(responseHelper.status.error).json(error.message);
  }
};

const create_user = async (req, res) => {
  try {
    const { username, password, satker, level_user_id } = req.body.data;
    const result = await Services.create_user(
      username,
      password,
      satker,
      level_user_id
    );
    if (result instanceof Error) {
      throw new Error(result);
    }
    res.status(responseHelper.status.success).json(result);
  } catch (error) {
    res.status(responseHelper.status.error).json(error.message);
  }
};

const read_user = async (req, res) => {
  try {
    const result = await Services.read_user();
    if (result instanceof Error) {
      throw new Error(result);
    }
    res.status(responseHelper.status.success).json(result);
  } catch (error) {
    res.status(responseHelper.status.error).json(error.message);
  }
};

const update_user = async (req, res) => {
  try {
    // Ambil data yang akan diubah dari permintaan
    const { user_id, username, password, satker, level_user_id } =
      req.body.data;

    // Buat objek yang hanya berisi data yang akan diubah
    const updatedUserData = {};

    if (username) {
      updatedUserData.username = username;
    }

    if (password) {
      // Hash password baru jika ada
      updatedUserData.password = await bcrypt.hash(password, 10);
    }

    if (satker) {
      updatedUserData.satker = satker;
    }

    if (level_user_id) {
      updatedUserData.level_user_id = level_user_id;
    }

    // Panggil layanan (service) untuk melakukan pembaruan
    const result = await Services.update_user(user_id, updatedUserData);

    if (result instanceof Error) {
      throw new Error(result);
    }

    res.status(responseHelper.status.success).json(result);
  } catch (error) {
    res.status(responseHelper.status.error).json(error.message);
  }
};

const delete_user = async (req, res) => {
  try {
    const user_id = req.verified;
    const { username } = req.body;

    const result = await Services.delete_user(username);
    if (result instanceof Error) {
      throw new Error(result);
    }
    res.status(responseHelper.status.success).json(result);
  } catch (error) {
    res.status(responseHelper.status.error).json(error.message);
  }
};

const logout = async (req, res) => {
  try {
    res
      .clearCookie("token")
      .status(responseHelper.status.success)
      .send("Berhasil Logout");
  } catch (error) {
    res.status(responseHelper.status.error).json(error.message);
  }
};

const verify = async (req, res, next) => {
  try {
    const verified = req.verified;
    const result = await Services.verify(verified);
    if (result instanceof Error) {
      throw new Error(result);
    }
    res.status(responseHelper.status.success).json(result);
  } catch (error) {
    res.status(responseHelper.status.error).json(error.message);
  }
};

module.exports = {
  login,
  home,
  dashboardData,
  catalogData,
  terbaru,
  archive_by_category,
  add_archive,
  archiveDetail,
  update_archive,
  detail_user,
  create_user,
  read_user,
  update_user,
  delete_user,
  logout,
  verify,
};

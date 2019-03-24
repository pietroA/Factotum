# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20190320132503) do

  create_table "site_functions", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "url"
    t.boolean "admin"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tasks", force: :cascade do |t|
    t.integer "user_id"
    t.string "name"
    t.text "description"
    t.integer "completed"
    t.date "start_date"
    t.date "end_date"
    t.date "completed_at"
    t.boolean "active"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_tasks_on_user_id"
  end

  create_table "user_functions", force: :cascade do |t|
    t.integer "user_id"
    t.integer "site_function_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["site_function_id"], name: "index_user_functions_on_site_function_id"
    t.index ["user_id"], name: "index_user_functions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", limit: 30, null: false
    t.string "email", null: false
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "admin"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["name"], name: "index_users_on_name", unique: true
  end

end
